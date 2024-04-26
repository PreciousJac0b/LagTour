import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
