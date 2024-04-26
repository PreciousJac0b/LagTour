import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { User } from '../../../database/entities/user.entity';
import { env } from '../../../config/env.config';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.jwt_access_secret,
      });

      const user = this.databaseService.user.findOne({});

      if (!user) {
        throw new UnauthorizedException('Invalid Admin Details');
      }
      request['user'] = payload;
      return true;
    } catch {
      console.log('Invalid or Expired Token');
      throw new UnauthorizedException('Invalid or Expired Token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
