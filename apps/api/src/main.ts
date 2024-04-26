import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { env } from './config/env.config';
import { ApiKeyGuard } from './modules/auth/guards/api.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalGuards(new ApiKeyGuard());

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagapi', app, document);

  await app
    .listen(env.port)
    .then(() => console.log(`app running on ${env.port}, LagTourBackend🚀`));
}

bootstrap();
