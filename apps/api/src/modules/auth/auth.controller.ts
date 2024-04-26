import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateUserDto, CreateUserDto } from './auth.dto';
import { access } from 'fs';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return { success: true, user };
  }

  @Post('signin')
  async signIn(@Body() authenticateUserDto: AuthenticateUserDto) {
    const token = await this.authService.signIn(authenticateUserDto);
    return { sucess: true, token };
  }
}
