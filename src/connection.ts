import Mongoose from "mongoose";

let db: Mongoose.Connection;

export const connect = (): void => {
  const uri =
    process.env.NODE_ENV === "test"
      ? (process.env.MONGO_URI_TEST as string)
      : (process.env.MONGO_URI as string);

  Mongoose.connect(uri, {
    // useNewUrlParser: true,
    // reconnectTries: 9999999999,
    connectTimeoutMS: 2000,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    retryWrites: true,
  });

  db = Mongoose.connection;
  db.once("connected", () => console.info(`Successfully connected to ${uri}`));
  db.on("error", (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });
};

export const disconnect = (): void => {
  if (!db) {
    return;
  }
  Mongoose.disconnect();
};
