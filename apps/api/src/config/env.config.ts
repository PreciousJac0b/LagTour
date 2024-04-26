import { IsIn, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { config } from 'dotenv';

import { validate } from '../common';

const environment = <const>['development', 'test', 'staging', 'production'];

export class Environment {
  @IsIn(environment)
  @IsNotEmpty()
  node_env: (typeof environment)[number]; // https://stackoverflow.com/questions/51528780/typescript-check-typeof-against-custom-type

  @IsInt()
  port: number;

  @IsNotEmpty()
  db_host: string;

  @IsNotEmpty()
  db_pass: string;

  @IsNotEmpty()
  db_user: string;

  @IsNotEmpty()
  db_name: string;

  @IsNotEmpty()
  jwt_access_secret: string;


  @IsNotEmpty()
  api_key: string;
}

config();
export const env = validate<Environment>(Environment, process.env);
