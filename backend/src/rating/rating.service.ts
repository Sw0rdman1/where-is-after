import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './schemas/rating.schema';
import { Model, Types } from 'mongoose';
import { Venue } from 'src/venue/schema/venue.schema';

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(Rating.name) private ratingModel: Model<Rating>,
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
    ) { }

    async rateVenue(userId: string, venueId: string, score: number): Promise<{
        averageScore: number;
        numberOfRatings: number;
        userRating: number;
    }> {
        if (score < 1 || score > 5) {
            throw new ConflictException('Rating must be between 1 and 5');
        }

        const userObjectId = new Types.ObjectId(userId);
        const venueObjectId = new Types.ObjectId(venueId);

        const [existingRating, venue] = await Promise.all([
            this.ratingModel.findOne({ user: userObjectId, venue: venueObjectId }),
            this.venueModel.findById(venueObjectId),
        ]);

        if (!venue) {
            throw new NotFoundException('Venue not found');
        }

        let newAverage = 0;
        let newRatingCount = venue.numberOfRatings;

        if (existingRating) {
            // Update average without changing count
            const totalScore = venue.averageScore * newRatingCount - existingRating.score + score;
            newAverage = totalScore / newRatingCount;

            existingRating.score = score;
            await existingRating.save();
        } else {
            // New rating
            newRatingCount += 1;
            const totalScore = venue.averageScore * venue.numberOfRatings + score;
            newAverage = totalScore / newRatingCount;

            await this.ratingModel.create({
                user: userObjectId,
                venue: venueObjectId,
                score,
            });
        }

        await this.venueModel.updateOne(
            { _id: venueObjectId },
            {
                $set: { averageScore: newAverage, numberOfRatings: newRatingCount },
            },
        );

        return {
            averageScore: newAverage,
            numberOfRatings: newRatingCount,
            userRating: score,
        };
    }


    async removeRating(userId: string, venueId: string): Promise<{
        averageScore: number;
        numberOfRatings: number;
    }> {
        const userObjectId = new Types.ObjectId(userId);
        const venueObjectId = new Types.ObjectId(venueId);

        const [rating, venue] = await Promise.all([
            this.ratingModel.findOne({ user: userObjectId, venue: venueObjectId }),
            this.venueModel.findById(venueObjectId),
        ]);

        if (!venue) {
            throw new NotFoundException('Venue not found');
        }

        if (!rating) {
            throw new NotFoundException('User has not rated this venue');
        }

        const oldScore = rating.score;
        const newRatingCount = venue.numberOfRatings - 1;

        let newAverage = 0;
        if (newRatingCount > 0) {
            const totalScore = venue.averageScore * venue.numberOfRatings - oldScore;
            newAverage = totalScore / newRatingCount;
        }

        await Promise.all([
            this.ratingModel.deleteOne({ _id: rating._id }),
            this.venueModel.updateOne(
                { _id: venueObjectId },
                {
                    $set: { averageScore: newAverage, numberOfRatings: newRatingCount },
                },
            ),
        ]);

        return {
            averageScore: newAverage,
            numberOfRatings: newRatingCount,
        };
    }


}
