import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './schemas/rating.schema';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Venue, VenueSchema } from 'src/venue/schema/venue.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Rating.name, schema: RatingSchema },
    { name: Venue.name, schema: VenueSchema }
  ])],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule { }
