import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import process from 'process';
require('dotenv').config();

@Injectable()
export class NodeMailerService {
  constructor(private mailService: MailerService) {}
  public async send(
    receivers: string,
    subject: string,
    template: string,
    context?: Record<string, any>,
  ) {

    return await this.mailService.sendMail({
      to: receivers,
      from: 'process.env.NODE_MAILER_SENDER',
      subject,
      template,
      context,
    });
  }
}
