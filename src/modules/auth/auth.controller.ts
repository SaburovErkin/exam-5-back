import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuards } from './guards/local.guard';
import { Request } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Req() req: Request, @Body() body: CreateUserDto) {
    return this.authService.create(body);
  }

  @ApiBody({
    schema: {
      example: {
        email: 'ali@gmail.com',
        password: '12345'
      }
    }
  })
  @UseGuards(LocalGuards)
  @Post('login')
  login(@Req() req: Request, @Body() body: any) {
    return req.user;
  }
}
