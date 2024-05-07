import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/modules/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @Inject() private readonly logger: LoggerService;

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = exception.message || 'Internal Server Error';
    if (error == 'Internal Server Error') {
      this.logger.error(`[${request.method}] ${request.url}, ${exception}`);
      return response
        .status(status)
        .json({ message: 'Something went wrong', statusCode: status });
    }
    this.logger.error(`[${request.method}] ${request.url}, ${exception.stack}`);
    response.status(status).json(exception.response);
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(HttpStatus.AMBIGUOUS)
      .send("This route doesn't exist in LagTour!😃");
  }
}
