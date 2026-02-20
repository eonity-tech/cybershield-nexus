import apiClient from "./api.client";
import type { Device } from "../models/Device";

/**
 * Récupère la liste complète des appareils enregistrés sur le réseau Nexus
 */
export const getAllDevices = async (): Promise<Device[]> => {
    try {
        const response = await apiClient.get<Device[]>('/devices');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des appareils:", error);
        throw error;
    }
};