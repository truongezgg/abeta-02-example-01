import { Module } from '@nestjs/common';
import { MockProject1Controller } from './mock-project1.controller';
import { MockProject1Service } from './mock-project1.service';

@Module({
  imports: [],
  controllers: [MockProject1Controller],
  providers: [MockProject1Service],
})
export class MockProject1Module {}
