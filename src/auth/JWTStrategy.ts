import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Member } from './entity/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Member)
    private userRepository: Repository<Member>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      secretOrPrivateKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<Member> {
    const { id } = payload;
    const member: Member = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!member) {
      throw new UnauthorizedException();
    }
    return member;
  }
}
