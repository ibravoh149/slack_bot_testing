import {
  ISlackCommandBodyObject,
  ISlackCommandResponse,
  ISlackMessageObject,
  ISlackResponse,
} from "../src/Controller/interfaces";
import crypto from "crypto";
import qs from "qs";

export const command_payload: ISlackCommandBodyObject = {
  token: "gIkuvaNzQIHg97ATvDxqgjtO",
  team_id: "T0001",
  team_domain: "example",
  enterprise_id: "E0001",
  enterprise_name: "Globular%20Construct%20In",
  channel_id: "C2147483705",
  channel_name: "test",
  user_id: "U2147483697",
  user_name: "Steve",
  command: "/bot",
  text: "94070",
  response_url: "https://hooks.slack.com/commands/1234/5678",
  trigger_id: "13345224609.738474920.8088930838d88f008e0",
  api_app_id: "A123456",
};

export const wrong_command_payload: ISlackCommandBodyObject = {
  token: "gIkuvaNzQIHg97ATvDxqgjtO",
  team_id: "T0001",
  team_domain: "example",
  enterprise_id: "E0001",
  enterprise_name: "Globular%20Construct%20In",
  channel_id: "C2147483705",
  channel_name: "test",
  user_id: "U2147483697",
  user_name: "Steve",
  command: "/hey",
  text: "94070",
  response_url: "https://hooks.slack.com/commands/1234/5678",
  trigger_id: "13345224609.738474920.8088930838d88f008e0",
  api_app_id: "A123456",
};

export const fakeSlackSignature = (payload: ISlackCommandBodyObject) => {
  const timeStamp = Math.floor(new Date().getTime() / 1000);
  const secret = process.env.SLACK_SIGNING_SECRET;
  const sig_basestring =
    "v0:" + timeStamp + ":" + qs.stringify(payload, { format: "RFC1738" });
  const sig =
    "v0=" +
    crypto
      .createHmac("sha256", secret as string)
      .update(sig_basestring as string)
      .digest("hex");
  return { sig, timeStamp };
};
