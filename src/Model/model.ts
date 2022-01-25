import { model } from "mongoose";
import { IBotMessagesDocument } from "./types";
import schema from "./schema";

export const BotMessages = model<IBotMessagesDocument>("bot", schema);
