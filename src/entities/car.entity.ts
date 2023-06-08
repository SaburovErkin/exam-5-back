import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Category } from './category.entity';

@Entity({ name: 'cars' })
export class Car {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marka: string;

  @Column()
  tanirovka: string;

  @Column()
  motor: string;

  @Column()
  year: string;

  @Column()
  color: string;

  @Column()
  distance: string;

  @Column()
  gearbook: string;

  @Column()
  price: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @OneToMany(() => Comment, (comment) => comment.car)
  comment: Comment[];

  @ManyToOne(() => Category, category => category.cars)
  category: Category;
    static id: any;
}

