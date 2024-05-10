import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@app/database-type-orm/data-source';
import config, { IConfig, IConfigAuth, validateConfig } from './config';
import {
  JwtAuthenticationGuard,
  JwtAuthenticationModule,
} from '@app/jwt-authentication';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { PostModule } from './post/post.module';
import { ExceptionFilterModule } from '@app/exception-filter';
import { RequestMakeFriendModule } from './request_make_friend/request_make_friend.module';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from '@app/core/filters/http-exception.filter';
import { TransformResponseInterceptor } from '@app/core/interceptors/transform-res.interceptor';
import { NodeMailerModule } from '@app/node-mailer';
import { LikeCommentModule } from './likeComment/likeComment.module';
import { LikePostModule } from './likePost/likePost.module';
import { NotificationModule } from './notification/notification.module';

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
    CommentModule,
    AuthModule,
    UserModule,

    PostModule,
    ExceptionFilterModule,
    RequestMakeFriendModule,

    NodeMailerModule,
    LikeCommentModule,
    LikePostModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
