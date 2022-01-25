import { Document, Model } from "mongoose";
interface IUser {
  name: string;
  id: string;
}

export interface IMsg {
  message?: string | string[];
  time?: Date;
}

interface Iconversaton {
  bot: IMsg;
  user?: IMsg;
  action_id: string;
}
export interface IBotMessages {
  channel_name: string;
  channel_id: string;
  user: IUser;
  command: string;
  block_id: string;
  conversation: Iconversaton[];
}

export interface IBotMessagesDocument extends IBotMessages, Document {}

export interface IBotMessagesModel extends Model<IBotMessagesDocument> {}
