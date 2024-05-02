import { Module } from '@nestjs/common';
import { DatabaseTypeOrmService } from './database-type-orm.service';
import { dataSource } from './dataSource';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options)],
  providers: [DatabaseTypeOrmService],
  exports: [DatabaseTypeOrmService],
})
export class DatabaseTypeOrmModule {}
