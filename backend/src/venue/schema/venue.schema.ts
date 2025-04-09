import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VenueCategory } from './venue.category.enum';

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
    images: string[];

    @Prop({ default: 0 })
    rating: number;

    @Prop({ type: String, enum: VenueCategory, required: true })
    category: VenueCategory;

    @Prop({ type: Object, default: {} })
    socials: {
        website?: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
        [key: string]: string | undefined;
    };

    @Prop({
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
    })
    location: Location;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);

VenueSchema.index({ location: '2dsphere' });
