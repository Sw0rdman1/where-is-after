import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async createUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ email, password: hashedPassword });
        return user.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

    async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
        const hashedToken = refreshToken ? await bcrypt.hash(refreshToken, 10) : null;
        await this.userModel.findByIdAndUpdate(userId, { refreshToken: hashedToken }).exec();
    }
}
