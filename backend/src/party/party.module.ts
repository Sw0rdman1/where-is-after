import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Party, PartySchema } from "./schema/party.schema";
import { Venue, VenueSchema } from "src/venue/schema/venue.schema";
import { PartyController } from "./party.controller";
import { PartyService } from "./party.service";
import { User, UserSchema } from "src/users/schema/user.schema";
import { JoinRequest, JoinRequestSchema } from "./schema/join.request.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Party.name, schema: PartySchema },
            { name: Venue.name, schema: VenueSchema },
            { name: User.name, schema: UserSchema },
            { name: JoinRequest.name, schema: JoinRequestSchema },
        ]),
    ],
    controllers: [PartyController],
    providers: [PartyService],
})
export class PartyModule { }
