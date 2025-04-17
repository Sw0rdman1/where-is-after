import { handleApiError } from "@/utils/errorHandler";
import { useAxios } from "@/context/ApiProvider";
import { useQueryClient } from '@tanstack/react-query';


export const usePartyRequestAPI = (partyId: string) => {
    const api = useAxios();
    const queryClient = useQueryClient();

    const API_ROUTE = `/parties/${partyId}/join-requests`

    const sendJoinRequest = async (numberOfPeople = 1): Promise<any> => {
        try {
            const res = await api.post(API_ROUTE, { numberOfPeople })
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const cancelJoinRequest = async (): Promise<any> => {
        try {
            const res = await api.delete(API_ROUTE)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const getJoinRequestsForParty = async (): Promise<any> => {
        try {
            const res = await api.get(API_ROUTE)
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const acceptRequest = async (userId: string): Promise<any> => {
        try {
            const res = await api.patch(`${API_ROUTE}/${userId}/accept`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        }
        catch (error) {
            handleApiError(error);
        }
    }

    const rejectRequest = async (userId: string): Promise<any> => {
        try {
            const res = await api.patch(`${API_ROUTE}/${userId}/reject`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    const leaveParty = async (): Promise<any> => {
        try {
            const res = await api.delete(`/parties/${partyId}/going`)
            queryClient.invalidateQueries({ queryKey: ['party', partyId] });
            return res.data;
        } catch (error) {
            handleApiError(error);
        }
    };

    return {
        getJoinRequestsForParty,
        sendJoinRequest,
        cancelJoinRequest,
        acceptRequest,
        rejectRequest,
        leaveParty,
    }
}