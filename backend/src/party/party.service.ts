import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Party } from './schema/party.schema';
import { Venue } from 'src/venue/schema/venue.schema';
import * as moment from "moment";
import { log } from 'console';

@Injectable()
export class PartyService {
    constructor(
        @InjectModel(Party.name) private readonly partyModel: Model<Party>,
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
    ) { }

    async findNearbyParties(longitude: number, latitude: number, radius: number, date: string | undefined) {

        const nearbyVenues = await this.venueModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius, // Radius in meters (from frontend)
                },
            },
        });

        const venueIds = nearbyVenues.map(venue => venue._id);

        const partyDate = date
            ? moment.utc(date).startOf('day').toDate()  // Start of the provided date in UTC
            : moment.utc().startOf('day').toDate();  // Default to today in UTC

        const endOfDay = new Date(partyDate.getTime() + 24 * 60 * 60 * 1000 - 1);  // End of the selected day

        log(`Searching for parties on ${partyDate} near ${latitude}, ${longitude} within ${radius} meters`);

        return this.partyModel
            .find({
                venue: { $in: venueIds }, // Matches any venue ID in the provided array
                date: {
                    $gte: partyDate, // Start of the selected date
                    $lt: endOfDay, // End of the selected date (23:59:59.999)
                },
            })
            .populate('venue') // Populates venue details
            .exec(); // Ensures it's a proper Promise

    }
}
