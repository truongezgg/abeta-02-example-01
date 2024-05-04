import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Message } from './message.schema';

export type ConversationDocument = mongoose.HydratedDocument<Conversation>;

@Schema()
export class Conversation {
  @Prop()
  conversation_id: number;

  @Prop()
  name: string;

  @Prop([Number])
  user_id: number[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
