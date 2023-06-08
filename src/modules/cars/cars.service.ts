import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../entities/car.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private readonly carRepo: Repository<Car>,
    private readonly jwtService: JwtService,
  ) {}
  create(
    createCarDto: CreateCarDto,
    file: Express.Multer.File,
    req: Request,
  ) {
    

    const car = this.carRepo.create({
      ...createCarDto,
      image: file.filename,
    });
    this.carRepo.save(car);
    return car;
  }

  findAll(): Promise<Car[]> {
    return this.carRepo.find({relations: ['category']});
  }

  findOne(id: number) {
    return this.carRepo.findOne({
      where: { id },
      relations: {
        category: true
      },
    });
  }

  remove(id: number) {
    return this.carRepo.delete({ id });
  }
}
