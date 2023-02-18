import { IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  kakaoId: string;
}
