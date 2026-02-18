import apiClient from "./api.client";
import type { NetworkTraffic } from "../models/NetworkTraffic";

export const getAllTraffic = async (): Promise<NetworkTraffic[]> => {
    try {
        // On utilise apiClient qui a déjà les headers et l'URL de base
        const response = await apiClient.get<NetworkTraffic[]>('/network-monitoring/dashboard');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du trafic réseau:", error);
        throw error;
    }
};