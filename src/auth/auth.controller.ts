import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateMemberDto } from './dto/create.member.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign.in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async createMember(@Body(ValidationPipe) dto: CreateMemberDto) {
    return this.authService.createMember(dto);
  }

  @Post('/signIn')
  async signIn(@Body(ValidationPipe) dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
