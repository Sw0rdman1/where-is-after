import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'invalid-email' })
    @IsNotEmpty({ message: 'required-email' })
    email: string;

    @IsNotEmpty({ message: 'required-password' })
    @MinLength(6, { message: 'min-length-password' })
    password: string;
}
