import { DataSource } from 'typeorm';
import { DefaultEntities } from './entities';
require('dotenv').config()
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  timezone: 'Z',
  charset: 'utf8mb4',
  bigNumberStrings: false,
  entities: [...DefaultEntities],
  migrations: [],
  subscribers: [],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
