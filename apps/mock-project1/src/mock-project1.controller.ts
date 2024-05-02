import { Controller, Get } from '@nestjs/common';
import { MockProject1Service } from './mock-project1.service';

@Controller()
export class MockProject1Controller {
  constructor(private readonly mockProject1Service: MockProject1Service) {}

  @Get()
  getHello(): string {
    return this.mockProject1Service.getHello();
  }
}
