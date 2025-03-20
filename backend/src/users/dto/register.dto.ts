import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Role } from '../schema/role.enum';

export class RegisterDto {
    @IsEmail({}, { message: 'invalid-email' })
    @IsNotEmpty({ message: 'required-email' })
    email: string;

    @IsNotEmpty({ message: 'required-password' })
    @MinLength(6, { message: 'min-length-password' })
    password: string;

    @IsNotEmpty({ message: 'required-displayname' })
    @MinLength(6, { message: 'min-length-displayname' })
    displayName: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
