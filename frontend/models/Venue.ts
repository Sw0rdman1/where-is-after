import { Region } from "react-native-maps";

interface Venue {
    _id: string;
    name: string;
    description: string;
    logo: string;
    images: string[];
    location: Region;
    socials: {
        website?: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
    }
}

export default Venue;