import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Request,
  ParseFilePipe,
  FileTypeValidator,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Car } from '../../entities/car.entity';


@ApiBearerAuth('token')
@Controller('cars')
@ApiTags('cars')
export class CarsController { constructor(private readonly carsService: CarsService) {}

@Post()
@ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        marka: { type: 'string', default: 'cobalt'},
        tanirovka: { type: 'string', default: 'yes' },
        motor: { type: 'string', default: '1.6' },
        year: { type: 'string', default: '2020' },
        color: { type: 'string', default: 'black' },
        distance: { type: 'string', default: '50000km' },
        gearbook: { type: 'string', default: 'ok' },
        price: { type: 'string', default: '5000$' },
        description: { type: 'string', default: 'yangi' },
        category: { type: 'string', default: 3 },
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
    @Body() createCarDto: CreateCarDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req: Request,
    ) {
      return this.carsService.create(createCarDto, file, req);
    }
    
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll(): Promise<Car[]> {
      return this.carsService.findAll()
    }
    

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.carsService.findOne(+id);
    }
    
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.carsService.remove(+id);
    }
  }
  