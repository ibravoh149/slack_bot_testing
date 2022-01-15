import { App } from "@slack/bolt";
import * as dotenv from "dotenv";

dotenv.config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  // socketMode: true,
  // appToken: process.env.APP_TOKEN,
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(3000);

  console.log("⚡️ Bolt app is running!");
})();

app.command("/bot", async ({ command, ack, say }) => {
  try {
    await ack();
    say("it is working");
  } catch (error) {
    console.log("errr=====", error);
  }
});