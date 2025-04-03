import Venue from "./Venue";

interface Party {
    _id: string;
    name: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    venue: Venue
}

export default Party;