import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateCarDto {
  @ApiProperty({
    default: 'cobalt'
  })
  @IsString()
  @IsNotEmpty()
  marka: string;

  @ApiProperty({
    default: 'yes'
  })
  @IsString()
  @IsNotEmpty()
  tanirovka: string;

  @ApiProperty({
    default: '1.6'
  })
  @IsString()
  @IsNotEmpty()
  motor: string;

  @ApiProperty({
    default: '2020'
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    default: 'black'
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    default: '50000km'
  })
  @IsString()
  @IsNotEmpty()
  distance: string;

  @ApiProperty({
    default: 'ok'
  })
  @IsString()
  @IsNotEmpty()
  gearbook: string;

  @ApiProperty({
    default: '12000$'
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    default: 'yangi'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    default: 1
  })
  @IsNotEmpty()
  category: any;
}