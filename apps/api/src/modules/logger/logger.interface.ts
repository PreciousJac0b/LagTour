import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class LoggerService {
  abstract warn(_message: string): void;

  abstract error(_message: string): void;

  abstract info(_message: string): void;

  abstract http(_message: string): void;

  abstract debug(_message: string): void;
}
