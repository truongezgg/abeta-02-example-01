import { Client } from 'onesignal-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from '../config';
// import { OnesignalDto } from './dtos/onesignal.dto';
import { CreateNotificationBody } from 'onesignal-node/lib/types';
import * as process from 'process';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class OneSignal {
  client: any;
  memberTag: string;
  isReceivedNotificationTag: string;

  constructor(private readonly configService: ConfigService<IConfig, true>) {
    this.client = new Client(
      process.env.ONESIGNAL_APP_ID,
      process.env.ONESIGNAL_API_KEY,
    );
  }

  async pushNotification(
    // playerIds: string[],
    title: string,
    content: string,
  ): Promise<{ msg: string }> {
    const notification: CreateNotificationBody = {
      headings: {
        en: title,
      },
      contents: {
        en: content,
      },
      included_segments: [process.env.ONESIGNAL_INCLUDED_SEGMENTS],
      // include_player_ids: playerIds,
    };

    console.log(notification);

    try {
      await this.client.createNotification(notification);
      return {
        msg: 'Create notification completed',
      };
    } catch (error) {
      console.error('Error creating notification:', error);
      throw new Error('Failed to create notification: ' + error.message);
    }
  }
}
