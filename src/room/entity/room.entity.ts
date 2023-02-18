import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../../auth/entity/member.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamp with time zone' })
  time: Date;

  @Column()
  name: string;

  // 안전한 접속을 위해 비밀번호 저장
  @Column({ nullable: true, select: false })
  password?: string;

  // 생성한 사람
  @ManyToOne(() => Member, (m) => m.mine, { eager: false })
  createdBy: Member;

  // 속한 맴버들
  @ManyToMany(() => Member, (m) => m.rooms, { eager: false })
  members: Member[];
}
