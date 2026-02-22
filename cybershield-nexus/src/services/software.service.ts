import apiClient from "./api.client";
import type { Software } from "../models/Software";

export const getAllSoftwares = async (): Promise<Software[]> => {
    try {
        const response = await apiClient.get<Software[]>('/softwares');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des logiciels:", error);
        throw error;
    }
};