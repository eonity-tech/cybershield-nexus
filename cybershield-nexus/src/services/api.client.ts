import axios from 'axios';
import keycloak from './auth/keycloak';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

apiClient.interceptors.request.use((config) => {
    // 1. Récupération dynamique du token depuis l'instance Keycloak
    const token = keycloak.token;
    const apiKey = import.meta.env.VITE_API_KEY;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 2. Ajout des headers spécifiques (x-api-key et Tenant)
    config.headers['x-api-key'] = apiKey;
    config.headers['X-Tenant-ID'] = 'client-free';

    // 3. Cache Interceptor (Équivalent de ton code Angular)
    if (config.url?.includes('/api/')) {
        config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        config.headers['Pragma'] = 'no-cache';
        config.headers['Expires'] = '0';
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de réponse pour gérer les erreurs d'authentification (ex: token expiré)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await keycloak.updateToken(30);
        }
        return Promise.reject(error);
    }
);

export default apiClient;