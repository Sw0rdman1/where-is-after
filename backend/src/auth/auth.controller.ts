import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/users/dto/auth.dto';

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
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: RequestWithUser) {
        this.authService.logout(req.user['sub']);
    }
}