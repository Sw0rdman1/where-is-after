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

    const deleteRating = async (venueId: string): Promise<any> => {
        try {
            const res = await api.delete(`/ratings/${venueId}`);
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    return { createRating, deleteRating };
}