import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PartyCategory } from './party.category.schema';

@Schema({ timestamps: true })
export class Party extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ type: String, enum: PartyCategory, required: true })
    category: PartyCategory;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venue: Types.ObjectId;
}

export const PartySchema = SchemaFactory.createForClass(Party);
