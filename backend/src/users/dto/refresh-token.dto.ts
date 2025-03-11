import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
    @IsEmail({}, { message: 'invalid-email' })
    @IsNotEmpty({ message: 'required-email' })
    email: string;

    @IsNotEmpty({ message: 'required-refresh-token' })
    refreshToken: string;

}
