import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { Member } from '../auth/entity/member.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  // 방 생성
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createRoom(@Req() req, @Body(ValidationPipe) dto: CreateRoomDto) {
    const member: Member = req.user;
    return this.roomService.createRoom(member, dto);
  }

  // 자신이 속한 방
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMyRooms(@Req() req) {
    const member: Member = req.user;
    return this.roomService.getMyRoom(member);
  }
}
