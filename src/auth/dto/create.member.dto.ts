import { IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  kakaoId: string;

  @IsString()
  name: string;
}
