import { join } from 'path';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './database/database.module';
import typeormConfig from './config/typeorm.config';
import { env } from './config/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/http';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exception_filter';
import { LoggerModule } from './modules/logger';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),

    JwtModule.register({ global: true, secret: env.access_secret }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../..', 'client', 'dist'),
    // }),

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    LoggerModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
