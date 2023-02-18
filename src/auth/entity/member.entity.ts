import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Room } from '../../room/entity/room.entity';

@Entity()
export class Member extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  // 방장인 방
  @OneToMany(() => Room, (r) => r.createdBy, { eager: false })
  mine: Room[];

  @JoinTable()
  @ManyToMany(() => Room, (r) => r.members, { eager: true })
  rooms: Room[];
}
