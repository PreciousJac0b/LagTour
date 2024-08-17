import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../users/users.repository';
import { AuthenticateUserDto, CreateUserDto } from './auth.dto';
import { User } from 'src/database/entities/user.entity';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password: unhashed } = createUserDto;

    const exist = await this.repository.findUserByUniqueFields({
      where: [{ username }, { email }],
    });

    if (exist) {
      const conflict = exist.username === username ? 'Username' : 'Email';
      throw new ConflictException(`${conflict} already exists`);
    }

    const password = await hash(unhashed, 10);
    const user = this.repository.createUser({ ...createUserDto, password });

    return user;
  }

  async signIn(createUserDto: AuthenticateUserDto): Promise<string> {
    const { password, email } = createUserDto;

    const user = await this.repository.findUserByUniqueField({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return this.createAccessToken(user);
  }

  private createAccessToken(user: User) {
    return this.jwtService.sign({ id: user.id }, { expiresIn: '1d' });
  }
}
