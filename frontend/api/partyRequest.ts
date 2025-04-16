import { handleApiError } from "@/utils/errorHandler";
import { useAxios } from "@/context/ApiProvider";
import { useQueryClient } from '@tanstack/react-query';


export const usePartyRequestAPI = () => {
    const api = useAxios();
    const queryClient = useQueryClient();

    const sendRequestToJoin = async (partyId: string): Promise<any> => {
        try {
            const res = await api.post(`/parties/${partyId}/request`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const cancelRequest = async (partyId: string): Promise<any> => {
        try {
            const res = await api.delete(`/parties/${partyId}/request`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const acceptRequest = async (partyId: string, userId: string): Promise<any> => {
        try {
            const res = await api.post(`/parties/${partyId}/accept/${userId}`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        }
        catch (error) {
            handleApiError(error);
        }
    }

    const rejectRequest = async (partyId: string, userId: string): Promise<any> => {
        try {
            const res = await api.post(`/parties/${partyId}/reject/${userId}`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const leaveParty = async (partyId: string): Promise<any> => {
        try {
            const res = await api.delete(`/parties/${partyId}/going`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    };

    return {
        sendRequestToJoin,
        cancelRequest,
        acceptRequest,
        rejectRequest,
        leaveParty,
    }
}