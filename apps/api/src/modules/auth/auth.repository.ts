import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { User } from '../../database/entities/user.entity';
import { DeepPartial, FindOptionsWhere } from 'typeorm';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserByUniqueFields(params: {
    where: FindOptionsWhere<User>[];
  }): Promise<User> {
    const { where } = params;
    return this.databaseService.user.findOne({ where });
  }

  async findUserByUniqueField(params: {
    where: FindOptionsWhere<User>;
  }): Promise<User> {
    const { where } = params;
    return this.databaseService.user.findOne({ where });
  }

  async createUser(data: DeepPartial<User>): Promise<User> {
    const user = this.databaseService.user.create(data);

    await this.databaseService.user.save(user);
    return user;
  }
}
