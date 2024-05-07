import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { IConfig, IConfigAuth, validateConfig } from './config';
import { JwtAuthenticationModule } from '@app/jwt-authentication';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@app/database-type-orm/data-source';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => config],
      cache: true,
      validate: validateConfig,
    }),
    JwtAuthenticationModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig, true>) => ({
        ...configService.get<IConfigAuth>('auth'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig, true>) => ({
        ...configService.get('typeORMOptions'),
      }),
      dataSourceFactory: async () => {
        return await dataSource.initialize();
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
