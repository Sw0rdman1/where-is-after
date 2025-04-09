import Party from "@/models/Party";
import { convertVenueLocationToRegion } from "./map";
import Venue from "@/models/Venue";

export const getPartyFromResponse = (response: any): Party => {
    const venueLocation = convertVenueLocationToRegion(response.venue);

    return {
        _id: response._id,
        name: response.name,
        description: response.description,
        startDate: new Date(response.startDate),
        endDate: new Date(response.endDate),
        image: response.image,
        venue: {
            _id: response.venue._id,
            name: response.venue.name,
            logo: response.venue.logo,
            description: response.venue.description,
            location: venueLocation,
            images: response.venue.images,
            socials: response.venue.socials,
        },
    };
}

export const getVenueFromResponse = (response: any): Venue => {
    const location = convertVenueLocationToRegion(response);

    return {
        _id: response._id,
        name: response.name,
        logo: response.logo,
        description: response.description,
        location: location,
        images: response.images,
        socials: response.venue.socials,
    };
}