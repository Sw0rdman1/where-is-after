import { handleApiError } from "@/utils/errorHandler";
import { Region } from "react-native-maps";
import api from "./axios";
import { convertVenueLocationToRegion } from "@/utils/map";
import Party from "@/models/Party";

export const getParties = async (location: Region, radius: number, date: Date): Promise<Party[]> => {
    try {
        const response = await api.get('/parties/nearby', {
            params: {
                longitude: location.longitude,
                latitude: location.latitude,
                radius,
                date
            },
        });

        console.log(response.data);


        const parties = response.data.map((party: Party) => {
            const venueLocation = convertVenueLocationToRegion(party.venue);

            return {
                _id: party._id,
                name: party.name,
                description: party.description,
                date: party.date,
                venue: {
                    _id: party.venue._id,
                    name: party.venue.name,
                    logo: party.venue.logo,
                    description: party.venue.description,
                    location: venueLocation,
                },
            };
        });

        return parties;
    } catch (error) {
        handleApiError(error);
        return [];
    }
}