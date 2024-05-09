import { Module } from '@nestjs/common';
import { NodeMailerService } from './node-mailer.service';
import { join } from 'path';
import * as process from 'process';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('NODE_MAILER_HOST'),
          port: configService.get('NODE_MAILER_PORT'),
          auth: {
            user: configService.get('NODE_MAILER_USER'),
            pass: configService.get('NODE_MAILER_PASS'),
          },
          service: 'gmail',
          secure: false,
        },
        template: {
          dir: join(process.cwd(), 'libs', 'node-mailer', 'src', 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
    ConfigModule,
  ],
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
