import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
    @IsEmail({}, { message: 'invalid-email' })
    @IsNotEmpty({ message: 'required-email' })
    email: string;

    @IsNotEmpty({ message: 'required-verification-code' })
    verificationCode: string;
}
