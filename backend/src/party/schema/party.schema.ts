import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PartyCategory } from './party.category.schema';
import { User } from 'src/users/schema/user.schema';

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

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    joinRequests: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    goingUsers: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
    rejectedUsers: Types.ObjectId[];
}

export const PartySchema = SchemaFactory.createForClass(Party);
