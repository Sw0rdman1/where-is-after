import { Region } from "react-native-maps";

export enum Role {
    USER = 'user',
    VENUE = 'venue',
    ADMIN = 'admin',
}

interface User {
    _id: string;
    displayName: string;
    profileImage: string;
    email: string;
    isVerified: boolean;
    role: Role;
    currentLocation: Region;
    venueOperator?: string;
}

export default User;