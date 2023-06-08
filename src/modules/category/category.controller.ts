import { Body, Controller, Get, Param, UploadedFile, Request, Post, UseInterceptors, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Category } from '../../entities/category.entity';


@ApiBearerAuth('token')
@Controller('categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        category: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: resolve(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
  )
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req: Request,
  ) {
    return this.categoryService.create(createCategoryDto, file, req);
  }
  
  
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<void> {
  //   return this.categoryService.delete(id);
  // }
}
