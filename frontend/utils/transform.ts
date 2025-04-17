import Party from "@/models/Party";
import { convertVenueLocationToRegion } from "./map";
import Venue from "@/models/Venue";

const INSTAGRAM_PREFIX = "https://www.instagram.com/";
const FACEBOOK_PREFIX = "https://www.facebook.com/";
const TIKTOK_PREFIX = "https://www.tiktok.com/@";

const transformSocials = (socials: any) => {
    if (!socials) return {}

    return {
        website: socials.website,
        instagram: socials.instagram ? `${INSTAGRAM_PREFIX}${socials.instagram}` : "",
        facebook: socials.facebook ? `${FACEBOOK_PREFIX}${socials.facebook}` : "",
        tiktok: socials.tiktok ? `${TIKTOK_PREFIX}${socials.tiktok}` : "",
    };
}

export const getPartyFromResponse = (response: any): Party => {
    const venueLocation = convertVenueLocationToRegion(response.venue);

    return {
        _id: response._id,
        name: response.name,
        description: response.description,
        startDate: new Date(response.startDate),
        endDate: new Date(response.endDate),
        image: response.image,
        goingUsers: response.goingUsers,
        userJoinRequestStatus: response.userStatus,
        venue: {
            _id: response.venue._id,
            name: response.venue.name,
            logo: response.venue.logo,
            description: response.venue.description,
            location: venueLocation,
            images: response.venue.images,
            socials: transformSocials(response.venue.socials),
            rating: response.venue.rating,
            numberOfRatings: response.venue.numberOfRatings,
            userRating: response.userRating,
        },
    };
}

export const getVenueFromResponse = (response: any): Venue => {
    const { venue } = response;

    const location = convertVenueLocationToRegion(venue);

    return {
        _id: venue._id,
        name: venue.name,
        logo: venue.logo,
        description: venue.description,
        location: location,
        images: venue.images,
        socials: transformSocials(venue.socials),
        rating: venue.rating,
        numberOfRatings: venue.numberOfRatings,
        userRating: response.userRating,
    };
}