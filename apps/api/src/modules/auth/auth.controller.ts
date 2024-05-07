import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateUserDto, CreateUserDto } from './auth.dto';
import { HttpController } from 'src/common/http';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController extends HttpController {
  @Inject() private readonly authService: AuthService;

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    return this.send({ user });
  }

  @Post('signin')
  async signIn(@Body() authenticateUserDto: AuthenticateUserDto) {
    const token = await this.authService.signIn(authenticateUserDto);
    return this.send({ token });
  }
}
