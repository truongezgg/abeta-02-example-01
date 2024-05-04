import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  message_id: number;

  @Prop()
  user_id: number;

  @Prop()
  content: string;

  @Prop()
  user_reply_id: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
