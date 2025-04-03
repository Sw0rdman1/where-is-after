import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venue } from 'src/venue/schema/venue.schema';
import { validateMongoID } from 'src/utils/validation';
import { log } from 'console';

@Injectable()
export class VenueService {
    constructor(@InjectModel(Venue.name) private readonly venueModel: Model<Venue>) { }

    async getVenueById(id: string) {

        validateMongoID(id);

        const venue = await this.venueModel
            .findById(id)
            .exec();

        if (!venue) {
            throw new NotFoundException(`Venue with id ${id} not found`);
        }

        log(`Venue with id ${id} found: ${venue.name}`);

        return venue;
    }
}
