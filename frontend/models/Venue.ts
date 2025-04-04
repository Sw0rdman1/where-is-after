import { Region } from "react-native-maps";

interface Venue {
    _id: string;
    name: string;
    description: string;
    logo: string;
    location: Region;
}

export default Venue;