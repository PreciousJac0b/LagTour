import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GetUser, HttpController } from 'src/common/http';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { User } from '../../database/entities/user.entity';

@Controller()
export class UsersController extends HttpController {
  @Inject() private readonly userService: UsersService;

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@GetUser() user: User) {
    return this.send({ user });
  }
}
