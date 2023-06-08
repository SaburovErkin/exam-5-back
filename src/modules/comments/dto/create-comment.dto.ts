import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    default: 'yaxshi moshina ekan olaman'
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    default: '1'
  })
  @IsNotEmpty()
  carId: any;
}
