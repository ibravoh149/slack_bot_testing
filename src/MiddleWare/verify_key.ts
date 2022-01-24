import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  const timeStamp = req.headers["X-Slack-Request-Timestamp"];
  const slack_sig = req.headers["X-Slack-Signature"];
  const secret = process.env.SLACK_SIGNING_SECRET;

  if (Math.abs(new Date().getTime() - Number(timeStamp)) > 60 * 5) {
    return;
  }
  const request: any = req;
  const sig_basestring = "v0:" + timeStamp + ":" + request.rawBody;

  const hmac =
    "v0=" +
    crypto.createHmac("sha256", secret).update(sig_basestring).digest("hex");

  console.log("is Valid", hmac === slack_sig);
  // console.log("is Valid");

  return next();
};
