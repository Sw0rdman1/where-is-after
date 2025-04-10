import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Venue } from 'src/venue/schema/venue.schema';
import { validateMongoID } from 'src/utils/validation';
import { log } from 'console';
import { Party } from 'src/party/schema/party.schema';

@Injectable()
export class VenueService {
    constructor(
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
        @InjectModel(Party.name) private readonly partyModel: Model<Party>,
    ) { }

    async getVenueById(id: string) {

        validateMongoID(id);

        const venue = await this.venueModel
            .findById(id)
            .exec();

        if (!venue) {
            throw new NotFoundException(`Venue with id ${id} not found`);
        }

        const now = new Date();

        const nextParty = await this.partyModel.findOne({
            venue: new Types.ObjectId(id),
            startDate: { $lt: now },
        })
            .sort({ startDate: -1 })
            .exec();

        log('Next Party:', nextParty);

        log(`Venue with id ${id} found: ${venue.name}`);

        return { venue, nextParty };
    }
}
