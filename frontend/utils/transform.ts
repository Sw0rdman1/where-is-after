import Party from "@/models/Party";
import { convertVenueLocationToRegion } from "./map";

export const getPartyFromResponse = (response: any): Party => {
    const venueLocation = convertVenueLocationToRegion(response.venue);

    return {
        _id: response._id,
        name: response.name,
        description: response.description,
        date: response.date,
        venue: {
            _id: response.venue._id,
            name: response.venue.name,
            logo: response.venue.logo,
            description: response.venue.description,
            location: venueLocation,
        },
    };
}