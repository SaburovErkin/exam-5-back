import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'Ali'
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({
    default: 'Valiyev'
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    default: '900000000'
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    default: 'ali@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '12345'
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
