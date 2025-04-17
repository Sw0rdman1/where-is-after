import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum JoinRequestStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class JoinRequest extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Party', required: true })
    party: Types.ObjectId;

    @Prop({ required: true, min: 1 })
    numberOfPeople: number;

    @Prop({ type: String, enum: JoinRequestStatus, required: true, default: JoinRequestStatus.PENDING })
    status: JoinRequestStatus;
}

export const JoinRequestSchema = SchemaFactory.createForClass(JoinRequest);
