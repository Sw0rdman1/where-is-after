import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, trim: true, minlength: 6 })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ default: false, required: true })
    isVerified: boolean;

    @Prop({ type: String, default: null })
    refreshToken?: string;

    toJSON() {
        const obj = this.toObject();
        delete obj.password;
        return obj;
    }

}

export const UserSchema = SchemaFactory.createForClass(User);
