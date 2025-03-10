import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/users/dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth,guard';

export interface RequestWithUser extends Request {
    user: { sub: string };
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    signin(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }


    @Get('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: RequestWithUser) {
        this.authService.logout(req.user['sub']);
    }
}