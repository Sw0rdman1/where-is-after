import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    ConfigModule,
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard, JwtAuthGuard],

})
export class AuthModule { }