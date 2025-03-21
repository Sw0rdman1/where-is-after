import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { Role } from './schema/role.enum';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async checkUserByEmail(email: string) {
    return this.userModel.findOne({ email }).select('displayName profileImage').exec()
  }

  async create(email: string, displayName: string, password: string, verificationCode: string, expires: Date, role: Role = Role.USER): Promise<Partial<User>> {
    const hashedPassword = await argon2.hash(password);
    const user = new this.userModel({
      email,
      displayName,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires: expires,
      role
    });

    user.save();

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async findByEmail(email: string, withoutPassword = false): Promise<User | null> {
    if (withoutPassword) {
      return this.userModel.findOne
        ({
          email
        })
        .select('-password')
        .exec();
    }

    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return this.userModel.findByIdAndUpdate(userId, { refreshToken }).exec();
  }

  async verify(_id: string) {
    return this.userModel
      .findOneAndUpdate({ _id }, { isVerified: true, verificationCode: '', verificationCodeExpires: null })
      .exec();
  }

  async updateVerificationCode(userId: string, code: string, expires: Date) {
    return this.userModel.findOneAndUpdate
      (
        { _id: userId },
        {
          verificationCode: code,
          verificationCodeExpires: expires
        }
      )
      .exec();
  }



}
