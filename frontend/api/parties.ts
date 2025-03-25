import { handleApiError } from "@/utils/errorHandler";
import { Region } from "react-native-maps";
import api from "./axios";

export const getParties = async (location: Region, radius: number, date: Date) => {
    try {
        const response = await api.get('/parties/nearby', {
            params: {
                longitude: location.longitude,
                latitude: location.latitude,
                radius,
                date
            },
        });

        console.log('Parties:', response.data);

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}