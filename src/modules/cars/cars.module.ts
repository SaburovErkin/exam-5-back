import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../../entities/car.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    JwtModule.register({ secret: 'olma' }),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {
}
