import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venue: Types.ObjectId;

    @Prop({ min: 1, max: 5, required: true })
    score: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.index({ user: 1, venue: 1 });

