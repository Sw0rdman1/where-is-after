import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from './role.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, trim: true, minlength: 6 })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ required: true, trim: true })
    displayName: string;

    @Prop({ type: String, default: null })
    profileImage: string;

    @Prop({ type: String, default: null })
    refreshToken?: string;

    @Prop({ default: false, required: true })
    isVerified: boolean;

    @Prop({ type: String, default: null })
    verificationCode: string

    @Prop({ type: Date, nullable: true })
    verificationCodeExpires: Date | null;

    @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
    venueOperator: Types.ObjectId;


}

export const UserSchema = SchemaFactory.createForClass(User);
