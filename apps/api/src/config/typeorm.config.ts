import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: env.db_host,
    port: 3306,
    username: env.db_user,
    password: env.db_pass,
    database: env.db_name, //database name replace with your database name but it should be 'root'
    autoLoadEntities: true,
    synchronize: true,
    // dropSchema: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
  }),
);
