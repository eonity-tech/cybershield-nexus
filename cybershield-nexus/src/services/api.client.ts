import axios from 'axios';
import keycloak from './auth/keycloak';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

apiClient.interceptors.request.use(async (config) => {
    // 1. JWT (Bearer Token)
    const token = keycloak.token;

    // 2. Clé API (On force la valeur du Postman si la variable d'env est vide)
    const apiKey = import.meta.env.VITE_API_KEY;

    // 3. Tenant ID (Stocké dans localStorage après connexion, sinon fallback à 'client-free')
    const tenantId = localStorage.getItem('nexus_tenant_id') || 'client-free';

    // Injection dans les headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['x-api-key'] = apiKey;
    config.headers['X-Tenant-ID'] = tenantId;

    return config;
}, (error) => {
    return Promise.reject(error);
});


// Interceptor de réponse pour gérer les erreurs d'authentification
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