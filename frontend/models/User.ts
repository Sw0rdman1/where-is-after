import { Region } from "react-native-maps";

interface User {
    _id: string;
    displayName: string;
    profileImage: string;
    email: string;
    isVerified: boolean;
    role: string;
    currentLocation: Region;
}

export default User;