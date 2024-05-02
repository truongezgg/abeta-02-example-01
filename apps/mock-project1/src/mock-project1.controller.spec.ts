import { Test, TestingModule } from '@nestjs/testing';
import { MockProject1Controller } from './mock-project1.controller';
import { MockProject1Service } from './mock-project1.service';

describe('MockProject1Controller', () => {
  let mockProject1Controller: MockProject1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MockProject1Controller],
      providers: [MockProject1Service],
    }).compile();

    mockProject1Controller = app.get<MockProject1Controller>(
      MockProject1Controller,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mockProject1Controller.getHello()).toBe('Hello World!');
    });
  });
});
