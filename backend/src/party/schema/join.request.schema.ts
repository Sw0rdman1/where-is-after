import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class JoinRequest extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Party', required: true })
    party: Types.ObjectId;

    @Prop({ required: true, min: 1 })
    numberOfPeople: number;

    @Prop({ enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
    status: 'pending' | 'accepted' | 'rejected';
}

export const JoinRequestSchema = SchemaFactory.createForClass(JoinRequest);
