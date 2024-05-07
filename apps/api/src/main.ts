import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { env } from './config/env.config';
import { ApiKeyGuard } from './modules/auth/guards/api.guard';
import { NotFoundExceptionFilter } from './common/exception_filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalGuards(new ApiKeyGuard());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: false,
      skipMissingProperties: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagapi', app, document);

  await app
    .listen(env.port)
    .then(() => Logger.log(`app running on ${env.port}, LagTourBackend🚀`));
}

bootstrap();
