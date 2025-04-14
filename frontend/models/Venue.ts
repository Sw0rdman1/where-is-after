import { Region } from "react-native-maps";
import Party from "./Party";

interface Venue {
    _id: string;
    name: string;
    description: string;
    logo: string;
    images: string[];
    location: Region;
    rating: number;
    numberOfRatings: number;
    userRating: number;
    socials: {
        website?: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
    },
}

export default Venue;