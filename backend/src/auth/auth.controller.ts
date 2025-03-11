import { Controller, Post, Body, UseGuards, Request, HttpCode, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from 'src/users/schema/role.enum';
import { RegisterDto } from 'src/users/dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { RefreshTokenDto } from 'src/users/dto/refresh-token.dto';
import { log } from 'console';
import { VerifyUserDto } from 'src/users/dto/verify-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password, body.role || Role.USER);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
    async logout(@Body() body: RefreshTokenDto) {
        return this.authService.logout(body.email);
    }

    @Post('refresh')
    async refresh(@Body() body: RefreshTokenDto) {
        return this.authService.refresh(body.refreshToken, body.email);
    }

    @Post('verify')
    async verify(@Body() body: VerifyUserDto) {
        return this.authService.verify(body.userId, body.verificationCode);
    }

}

