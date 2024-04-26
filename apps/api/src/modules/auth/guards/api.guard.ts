import { Request } from 'express';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { env } from '../../../config/env.config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apikey = this.extractApiFromHeader(request);

    if (!apikey)
      throw new UnauthorizedException('Add an apikey to the request header');

    if (apikey !== env.api_key)
      throw new UnauthorizedException('Invalid apikey');

    return true;
  }

  private extractApiFromHeader(request: Request): string | undefined {
    return (request.headers.apikey as string) ?? '';
  }
}

