import { Schema } from "mongoose";

const BankAccountSchema = new Schema(
  {
    channel_name: {
      type: String,
      required: true,
    },
    channel_id: {
      type: String,
    },
    user: {
      name: { type: String, default: null },
      id: { type: String, default: null },
    },
    command: String,
    block_id: { type: String, unique: true },
    conversation: [
      {
        bot: { message: String, time: { type: Date, default: new Date() } },
        user: {
          message: Schema.Types.Mixed,
          time: { type: Date },
        },
        action_id: { type: String },
      },
    ],
  },
  {
    minimize: false,
    id: false,
    toJSON: {
      getters: true,
      virtuals: true,
      minimize: false,
      versionKey: false,
      // retainKeyOrder: true
    },
    toObject: {
      getters: true,
      virtuals: true,
      minimize: false,
      versionKey: false,
      // retainKeyOrder: true
    },

    // autoIndex: false,
    safe: true,
    timestamps: true,
    // usePushEach: true,
    // useFindAndModify:false,
    strict: process.env.NODE_ENV !== "development",
  } // Only use strict in production}
);

export default BankAccountSchema;
