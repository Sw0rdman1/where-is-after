import User from "./User";
import Venue from "./Venue";

export enum JoinRequestStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    NONE = 'none',
}

interface Party {
    _id: string;
    name: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    venue: Venue;
    goingUsers: Partial<User>[];
    userJoinRequestStatus: JoinRequestStatus;
    userQRCode?: string;
}

export default Party;