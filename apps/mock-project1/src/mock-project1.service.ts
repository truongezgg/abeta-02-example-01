import { Injectable } from '@nestjs/common';

@Injectable()
export class MockProject1Service {
  getHello(): string {
    return 'Hello World!';
  }
}
