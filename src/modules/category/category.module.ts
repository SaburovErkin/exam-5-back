import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { JwtMiddleware } from '../../middlewares/checkToken';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category]),
  JwtModule.register({ secret: 'olma' }),],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/categories');
  }
}