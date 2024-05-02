import { NestFactory } from '@nestjs/core';
import { MockProject1Module } from './mock-project1.module';

async function bootstrap() {
  const app = await NestFactory.create(MockProject1Module);
  await app.listen(3000);
}
bootstrap();
