import { handleApiError } from "@/utils/errorHandler";
import Venue from "@/models/Venue";
import { useAxios } from "@/context/ApiProvider";

export const useVenueAPI = () => {
    const api = useAxios();

    const getVenue = async (id: string): Promise<Venue | null> => {
        try {
            const response = await api.get(`/venues/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
            return null;
        }
    }

    return { getVenue };
}