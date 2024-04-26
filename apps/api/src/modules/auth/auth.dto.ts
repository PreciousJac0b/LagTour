import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class AuthenticateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
