import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Party extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venue: Types.ObjectId;
}

export const PartySchema = SchemaFactory.createForClass(Party);
