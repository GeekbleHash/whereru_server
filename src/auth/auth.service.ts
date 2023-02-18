import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create.member.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign.in.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  // 회원가입
  async createMember(dto: CreateMemberDto) {
    const { kakaoId, name } = dto;
    let member = await this.memberRepo.findOne({
      where: {
        id: kakaoId,
      },
    });
    if (member) {
      throw new ConflictException();
    }
    member = Member.create({
      id: kakaoId,
      name,
    });
    await this.memberRepo.save(member);
    return member;
  }

  // 로그인 로직
  async signIn(dto: SignInDto) {
    const { kakaoId } = dto;
    const member = await this.memberRepo.findOne({
      where: { id: kakaoId },
    });
    if (!member) {
      throw new UnauthorizedException();
    }
    const payload = { id: kakaoId, name: member.name };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { accessToken };
  }
}
