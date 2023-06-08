import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {  Car } from './car.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;
  
  @OneToMany(() =>  Car, car => car.category, {
    onDelete: 'CASCADE'
  })
  cars: Car[];
    static id: any;
}