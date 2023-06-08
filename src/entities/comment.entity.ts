import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';
import { User } from './user.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @ManyToOne(() => Car, (car) => car.comment)
  car: Car;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;
}
