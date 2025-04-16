import User from "./User";
import Venue from "./Venue";

type UserStatus = 'none' | 'requested' | 'going' | 'rejected';

interface Party {
    _id: string;
    name: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    venue: Venue;
    goingUsers: Partial<User>[];
    rejectedUsers?: Partial<User>[];
    joinRequests?: Partial<User>[];
    userStatus?: UserStatus;
}

export default Party;