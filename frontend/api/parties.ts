import { handleApiError } from "@/utils/errorHandler";
import Party from "@/models/Party";
import { Region } from "react-native-maps";
import { getPartyFromResponse } from "@/utils/transform";
import { useAxios } from "@/context/ApiProvider";
import { useQueryClient } from '@tanstack/react-query';


export const usePartyAPI = () => {
    const api = useAxios();
    const queryClient = useQueryClient();

    const getParties = async (location: Region, radius: number, date: Date): Promise<Party[]> => {
        try {
            const response = await api.get('/parties', {
                params: {
                    longitude: location.longitude,
                    latitude: location.latitude,
                    radius,
                    date
                },
            });

            const parties = response.data.map((party: Party) => getPartyFromResponse(party));

            return parties;
        } catch (error) {
            handleApiError(error);
            return [];
        }
    }

    const getParty = async (id: string): Promise<Party | null> => {
        try {
            const response = await api.get(`/parties/${id}`);
            return getPartyFromResponse(response.data);
        } catch (error) {
            handleApiError(error);
            return null;
        }
    }

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
        getParties,
        getParty,
        sendRequestToJoin,
        cancelRequest,
        acceptRequest,
        rejectRequest,
        leaveParty,
    }
}