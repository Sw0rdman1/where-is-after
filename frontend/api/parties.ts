import api from "./axios";
import { handleApiError } from "@/utils/errorHandler";
import Party from "@/models/Party";
import { Region } from "react-native-maps";
import { getPartyFromResponse } from "@/utils/transform";

export const getParties = async (location: Region, radius: number, date: Date): Promise<Party[]> => {
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

export const getParty = async (id: string): Promise<Party | null> => {
    try {
        const response = await api.get(`/parties/${id}`);
        return getPartyFromResponse(response.data);
    } catch (error) {
        handleApiError(error);
        return null;
    }
}