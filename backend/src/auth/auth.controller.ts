import { Controller, Post, Body, UseGuards, Request, HttpCode, Patch, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from 'src/users/schema/role.enum';
import { RegisterDto } from 'src/users/dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshTokenDto } from 'src/users/dto/refresh-token.dto';
import { VerifyUserDto } from 'src/users/dto/verify-user.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('check-email')
    async checkEmail(@Query('email') email: string) {
        return this.authService.checkUserByEmail(email);
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password, body.displayName, body.role || Role.USER);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
    async logout(@Body() body: RefreshTokenDto) {
        return this.authService.logout(body.refreshToken);
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshTokenDto) {
        return this.authService.refresh(body.refreshToken);
    }

    @Post('verify-email')
    async verify(@Body() body: VerifyUserDto) {
        return this.authService.verifyEmail(body.userId, body.verificationCode);
    }

    @Post('resend-verification-code')
    async resendVerificationCode(@Body() body: { email: string }) {
        log('resendVerificationCode');
        return this.authService.resendVerificationCode(body.email);
    }

    @Get('profile')
    async getProfile(@Query('id') id: string) {
        return this.authService.getProfile(id);
    }
}

