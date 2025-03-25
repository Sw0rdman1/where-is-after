import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {

    @IsNotEmpty({ message: 'required-refresh-token' })
    refreshToken: string;

}
