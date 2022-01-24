import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  const timeStamp = req.headers["X-Slack-Request-Timestamp"];
  const slack_sig = req.headers["X-Slack-Signature"];
  console.log(slack_sig);
  const secret = process.env.SLACK_SIGNING_SECRET;

  if (Math.abs(new Date().getTime() - Number(timeStamp)) > 60 * 5) {
    return res.status(401).send("ignored");
  }
  const request: any = req;
  const sig_basestring = "v0:" + timeStamp + ":" + request.rawBody;

  const hmac =
    "v0=" +
    crypto
      .createHmac("sha256", secret as string)
      .update(sig_basestring as string)
      .digest("hex");

  // console.log(
  //   "is Valid",
  //   crypto.timingSafeEqual(
  //     Buffer.from(hmac as string, "utf-8"),
  //     Buffer.from(slack_sig as string, "utf-8")
  //   )
  // );
  //   if (crypto.timingSafeEqual(
  //     Buffer.from(hmac, 'utf8'),
  //     Buffer.from(slack_sig as string, 'utf8'))) {
  // next();
  // } else {
  // return res.status(401).send('Verification failed');
  // }
  // console.log("is Valid");

  return next();
};
