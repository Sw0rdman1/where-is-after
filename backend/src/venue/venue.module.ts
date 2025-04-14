import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue, VenueSchema } from "src/venue/schema/venue.schema";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";
import { Party, PartySchema } from "src/party/schema/party.schema";
import { Rating, RatingSchema } from "src/rating/schemas/rating.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Venue.name, schema: VenueSchema },
            { name: Party.name, schema: PartySchema },
            { name: Rating.name, schema: RatingSchema },
        ])
    ],
    controllers: [VenueController],
    providers: [VenueService],
})
export class VenueModule { }
