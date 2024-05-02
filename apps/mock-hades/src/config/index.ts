import { dataSource } from '@app/database-type-orm/dataSource';
const config = {
  port: Number(process.env.PORT) || 3000,
  appName: 'Notification',
  oneSignal: {
    appId: 'fc2ab6c6-d612-4028-abf1-44c2dc92fe02',
    restKey: process.env.REST_KEY,
  },
  auth: {
    secretOrKey: process.env.JWT_SECRET_KEY,
    accessTokenExpiredIn: '10d',
    refreshTokenExpiredIn: '365d',
  },
  sendGrid: {
    sender: process.env.SENDGRID_SENDER,
    apiKey: process.env.SENDGRID_API_KEY,
  },
  twilio: {
    sid: process.env.TWILIO_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  queue: {
    host: process.env.QUEUE_HOST || 'localhost',
    port: process.env.QUEUE_PORT || 6379,
    prefix: process.env.QUEUE_PREFIX || '',
  },
};

export interface IConfigOneSignal {
  restKey: string;
  appId: string;
}
export interface IConfig {
  typeORMOptions: typeof dataSource;
  appName: string;
  oneSignal: IConfigOneSignal;
}

export default config;
