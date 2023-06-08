import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtService } from '@nestjs/jwt';
import { Car } from '../../entities/car.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly jwtService: JwtService,
  ) {}

  create(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
    req: Request,
  ) {

    const category = this.categoryRepo.create({
      ...createCategoryDto,
      image: file.filename,
    });
    this.categoryRepo.save(category);
    return category;
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({relations: ['cars']});
  }

  findOne(id: number) {
    return this.categoryRepo.findOne({
      where: { id },
      relations: {
        cars: true
      },
    });
  }

  delete(id: number) {
    return this.categoryRepo.delete({ id });
  }

  // async delete(id: number): Promise<void> {
  //   const category = await this.categoryRepo.findOne(id, { relations: ['cars'] });
  //   if (!category) {
  //     throw new NotFoundException(`Category with id ${id} not found`);
  //   }
  //   await this.categoryRepo.delete(category);
  // }
}