import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Location {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
}

@Schema({ timestamps: true })
export class Venue extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    logo: string;

    @Prop({ required: true })
    category: string; // e.g., Club, DJ, Catering

    @Prop({ default: 0 })
    rating: number;

    @Prop({
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
    })
    location: Location;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);

VenueSchema.index({ location: '2dsphere' });
