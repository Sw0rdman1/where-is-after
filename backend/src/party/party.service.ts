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
                    $maxDistance: radius,
                },
            },
        });

        const venueIds = nearbyVenues.map(venue => venue._id);

        const partyDate = date
            ? moment.utc(date).startOf('day').toDate()
            : moment.utc().startOf('day').toDate();

        const endOfDay = new Date(partyDate.getTime() + 24 * 60 * 60 * 1000 - 1);

        return this.partyModel
            .find({
                venue: { $in: venueIds },
                date: {
                    $gte: partyDate,
                    $lt: endOfDay,
                },
            })
            .populate('venue')
            .exec();

    }

    async getPartyById(id: string) {
        return this.partyModel.findById(id).populate('venue').exec();
    }
}
