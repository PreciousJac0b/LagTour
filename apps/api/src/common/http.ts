import {
  Injectable,
  NestMiddleware,
  Inject,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { User } from '../database/entities/user.entity';

import { LoggerService } from 'src/modules/logger';

/**
 * A generic controller to make the controllers response uniform accross the codebase
 */
@Injectable()
export class HttpController {
  protected send(data?: any) {
    return { success: true, data };
  }
  protected message(message: string, data?: any) {
    return { success: true, message, data };
  }
}

const sensitiveDetails = ['token', 'code', 'password']; // the response will exclude sensitive details in the request object.

/**
 * A Logger Provider for logging every http request to the server. It also includes to filter sensitive details
 * sent by the client
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  @Inject() private readonly logger: LoggerService;

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;

    ['send', 'json'].forEach((m) => {
      const method = res[m];
      res[m] = function (body?: any) {
        res.locals.body =
          body instanceof Buffer ? JSON.parse(body.toString()) : body;
        return method.call(this, body);
      };
    });

    res.on('finish', () => {
      const duration = res.getHeader('X-Response-Time');
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const hasPrivateDetails =
        this.check(req.body) || this.check(req.query) || this.check(req.params);

      if (hasPrivateDetails) {
        req.body = this.removeSensitiveFields(req.body);
        res.locals.body = {};
      }

      this.logger.info(
        JSON.stringify({
          'status-code': statusCode,
          method,
          'original-url': originalUrl,
          ip,
          'content-length': contentLength,
          'request-body': req.body,
          response: res.locals.body,
          duration,
          timestamp: new Date(),
        }),
      );
    });

    next();
  }

  private check(data: any) {
    return sensitiveDetails.some((field) => data[field] !== undefined);
  }

  private removeSensitiveFields(data: any) {
    sensitiveDetails.forEach((field) => delete data[field]);
    return data;
  }
}

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    const { password, ...rest } = req.user;
    console.log(req.user);
    
    return rest;
  },
);

export const toLowerCase = ({ value }) => (<string>value).toUpperCase();
