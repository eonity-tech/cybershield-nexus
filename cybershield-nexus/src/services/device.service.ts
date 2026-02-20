import apiClient from "./api.client";
import type { Device } from "../models/Device";

export const getAllDevices = async (): Promise<Device[]> => {
    try {
        const response = await apiClient.get<Device[]>('/devices');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des appareils:", error);
        throw error;
    }
};

export const blockDevice = async (id: string): Promise<void> => {
    try {
        await apiClient.post(`/devices/security/${id}/block`);
    } catch (error) {
        console.error(`Erreur lors du blocage de l'appareil ${id}:`, error);
        throw error;
    }
};

export const unblockDevice = async (id: string): Promise<void> => {
    try {
        await apiClient.post(`/devices/security/${id}/unblock`);
    } catch (error) {
        console.error(`Erreur lors du déblocage de l'appareil ${id}:`, error);
        throw error;
    }
};