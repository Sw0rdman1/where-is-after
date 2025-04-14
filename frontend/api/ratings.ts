import { useAxios } from "@/context/ApiProvider";
import { handleApiError } from "@/utils/errorHandler";

export const useRatingAPI = () => {
    const api = useAxios();

    const createRating = async (venueId: string, score: number): Promise<any> => {
        try {
            const res = await api.post('/ratings', { venueId, score });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    return { createRating };
}