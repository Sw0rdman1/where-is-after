
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { Role } from 'src/users/schema/role.enum';
import { User } from 'src/users/schema/user.schema';
import { generateVerificationCode } from 'src/utils/random';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    async checkUserByEmail(email: string) {
        const user = await this.usersService.checkUserByEmail(email);

        if (!user) return { exists: false };

        return {
            exists: true,
            displayName: user.displayName,
            profileImage: user.profileImage
        }
    }

    async register(email: string, password: string, displayName: string, role: Role = Role.USER) {
        const userExists = await this.usersService.findByEmail(email);

        if (userExists) {
            throw new UnauthorizedException('Email already exists');
        }

        const verificationCode = generateVerificationCode();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15); // Expiry time (15 minutes)

        // Create the user
        const user = await this.usersService.create(
            email,
            displayName,
            password,
            verificationCode,
            expires
        );

        await this.emailService.sendVerificationCode(email, verificationCode);

        return { user, message: 'Registration successful. Please check your email for the verification code.' };

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

    async getEmailFromRefreshToken(refreshToken: string) {
        const decoded = this.jwtService.decode(refreshToken) as any;
        return decoded.email;
    }

    async refresh(refreshToken: string) {
        const email = await this.getEmailFromRefreshToken(refreshToken);

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

    async verifyEmail(userId: string, code: string) {
        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) {
            throw new BadRequestException('Verification code expired');
        }

        if (user.verificationCode !== code) {
            throw new BadRequestException('Invalid verification code');
        }

        // Set user as verified

        await this.usersService.verify(userId);

        const userData = await this.login(user);

        return { message: 'Email verified successfully', ...userData };
    }

    async resendVerificationCode(email: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.isVerified) {
            throw new BadRequestException('User already verified');
        }

        const verificationCode = generateVerificationCode();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15); // Expiry time (15 minutes)

        const userID = user._id as string;

        await this.usersService.updateVerificationCode(userID, verificationCode, expires);

        await this.emailService.sendVerificationCode(user.email, verificationCode);

        return { message: 'Verification code sent successfully' };
    }

    async getProfile(id: string) {
        const user = await this.usersService.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
