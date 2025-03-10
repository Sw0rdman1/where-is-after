import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from 'src/users/schema/role.enum';
import { RegisterDto } from 'src/users/dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body.email, body.password, body.role || Role.USER);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('logout')
    async logout(@Request() req) {
        return this.authService.logout(req.user);
    }

    @Post('refresh')
    async refresh(@Request() req) {
        return this.authService.refresh(req.user);
    }
}

