import User from "./User";
import Venue from "./Venue";

interface Party {
    _id: string;
    name: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    venue: Venue;
    goingUsers: Partial<User>[];
    isUserGoing: boolean;
}

export default Party;