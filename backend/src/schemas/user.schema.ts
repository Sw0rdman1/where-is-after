import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, trim: true, minlength: 6 })
    password: string;

    @Prop({ default: false, required: true })
    isVerified: boolean;

    @Prop({ type: String, default: null })
    refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
