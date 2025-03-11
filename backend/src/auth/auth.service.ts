
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { Role } from 'src/users/schema/role.enum';
import { User } from 'src/users/schema/user.schema';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async register(email: string, password: string, role: Role = Role.USER) {
        const user = await this.usersService.findByEmail(email);

        if (user) {
            throw new UnauthorizedException('Email already exists');
        }

        return this.usersService.create(email, password, role);
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await argon2.verify(user.password, password))) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }


    async login(user: User) {
        const userID = user._id as string;
        const payload = { email: user.email, sub: userID, role: user.role };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        });

        await this.usersService.updateRefreshToken(userID, refreshToken);

        const fetchedUser = await this.usersService.findByEmail(user.email, true);

        return { user: fetchedUser, accessToken, refreshToken };
    }

    async logout(email: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const userID = user._id as string;

        return this.usersService.updateRefreshToken(userID, null);
    }

    async refresh(refreshToken: string, email: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        if (user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const userID = user._id as string;
        const payload = { email: user.email, sub: userID, role: user.role };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });

        return { accessToken };
    }

    async verify(_id: string, verificationCode: string) {
        const user = await this.usersService.findById(_id);

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        if (verificationCode !== '123456') {
            throw new UnauthorizedException('Invalid verification code');
        }

        return this.usersService.verify(_id);
    }
}
