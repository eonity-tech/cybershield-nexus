import apiClient from "./api.client";
import type { NetworkTraffic } from "../models/NetworkTraffic";

/**
 * Récupère les données de trafic réseau pour le dashboard Nexus
 */
export const getAllTraffic = async (): Promise<NetworkTraffic[]> => {
    try {
        const response = await apiClient.get<NetworkTraffic[]>('/network-monitoring/dashboard');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du trafic réseau:", error);
        throw error;
    }
};