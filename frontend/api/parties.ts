import { handleApiError } from "@/utils/errorHandler";
import Party from "@/models/Party";
import { Region } from "react-native-maps";
import { getPartyFromResponse } from "@/utils/transform";
import { useAxios } from "@/context/ApiProvider";
import { useQueryClient } from '@tanstack/react-query';


export const usePartyAPI = () => {
    const api = useAxios();

    const getParties = async (location: Region, radius: number, date: Date): Promise<Party[]> => {
        try {
            const response = await api.get('/parties/nearby', {
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

    const getPartiesForVenue = async (venueId: string): Promise<Party[]> => {
        try {
            const response = await api.get(`/parties/venue/${venueId}`);
            return response.data.map((party: Party) => getPartyFromResponse(party));
        } catch (error) {
            handleApiError(error);
            return [];
        }
    }



    return {
        getParties,
        getParty,
        getPartiesForVenue
    }
}