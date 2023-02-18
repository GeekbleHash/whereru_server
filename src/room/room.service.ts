import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entity/room.entity';
import { Repository } from 'typeorm';
import { Member } from '../auth/entity/member.entity';
import { CreateRoomDto } from './dto/create.room.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repo: Repository<Room>,
  ) {}

  async createRoom(member: Member, dto: CreateRoomDto): Promise<Room> {
    const { name, password } = dto;
    const time = dayjs(dto.time).toDate();
    const room = Room.create({
      name,
      time,
      password,
      createdBy: member,
      members: [member],
    });
    await this.repo.save(room);
    return room;
  }

  async getMyRoom(member: Member): Promise<Room[]> {
    return member.rooms;
  }
}
