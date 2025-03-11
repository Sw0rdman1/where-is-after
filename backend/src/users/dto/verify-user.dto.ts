import { IsNotEmpty } from 'class-validator';

export class VerifyUserDto {
    @IsNotEmpty({ message: 'required-id' })
    userId: string;

    @IsNotEmpty({ message: 'required-verification-code' })
    verificationCode: string;
}
