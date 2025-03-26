import Venue from "./Venue";

interface Party {
    _id: string;
    name: string;
    description?: string;
    date: string;
    venue: Venue
}

export default Party;