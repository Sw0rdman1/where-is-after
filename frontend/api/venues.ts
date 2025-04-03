import { handleApiError } from "@/utils/errorHandler";
import api from "./axios";
import Venue from "@/models/Venue";

export const getVenue = async (id: string): Promise<Venue | null> => {
    try {
        const response = await api.get(`/venues/${id}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
        return null;
    }
}