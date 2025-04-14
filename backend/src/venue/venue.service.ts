import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Venue } from 'src/venue/schema/venue.schema';
import { validateMongoID } from 'src/utils/validation';
import { Party } from 'src/party/schema/party.schema';
import { Rating } from 'src/rating/schemas/rating.schema';

@Injectable()
export class VenueService {
    constructor(
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
        @InjectModel(Party.name) private readonly partyModel: Model<Party>,
        @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    ) { }

    async getVenueById(id: string, userId: string) {
        validateMongoID(id);

        const venue = await this.venueModel.findById(id).exec();
        if (!venue) {
            throw new NotFoundException(`Venue with id ${id} not found`);
        }

        const now = new Date();

        const nextParty = await this.partyModel.findOne({
            venue: new Types.ObjectId(id),
            startDate: { $lt: now },
        }).sort({ startDate: -1 }).exec();

        const ratingStats = await this.ratingModel.aggregate([
            { $match: { venue: new Types.ObjectId(id) } },
            {
                $group: {
                    _id: '$venue',
                    avgScore: { $avg: '$score' },
                    count: { $sum: 1 },
                },
            },
        ]);

        const averageScore = ratingStats[0]?.avgScore ?? 0;
        const numberOfRatings = ratingStats[0]?.count ?? 0;

        let userRating: number | null = null;
        if (userId) {
            const userRatingDoc = await this.ratingModel.findOne({
                venue: new Types.ObjectId(id),
                user: new Types.ObjectId(userId),
            });
            userRating = userRatingDoc?.score ?? null;
        }

        return {
            venue: {
                ...venue.toObject(),
                rating: Number(averageScore.toFixed(2)),
                numberOfRatings
            },
            nextParty,
            userRating,
        };
    }
}
