import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue, VenueSchema } from "src/venue/schema/venue.schema";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }])
    ],
    controllers: [VenueController],
    providers: [VenueService],
})
export class VenueModule { }
