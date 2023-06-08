import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';



export class CreateCategoryDto {
  @ApiProperty({
    default: 'chevrolet'
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
