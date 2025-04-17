import { JoinRequestStatus } from "./Party";
import User from "./User";

export interface JoinRequest {
    _id: string;
    partyId: string;
    user: User;
    status: JoinRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}