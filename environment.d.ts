declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
      SLACK_SIGNING_SECRET: string;
      SLACK_BOT_TOKEN: string;
      MONGO_URI: string;
      MONGO_URI_TEST: string;
      // APP_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
