import { Module } from '@nestjs/common';
import { ExceptionFilterService } from './exception-filter.service';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
@Module({
  providers: [
    ExceptionFilterService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [ExceptionFilterService],
})
export class ExceptionFilterModule {}
