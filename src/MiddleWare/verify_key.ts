import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  const timeStamp = req.headers["x-slack-request-timestamp"];
  const slack_sig = req.headers["x-slack-signature"];
  const request: any = req;

  console.log(timeStamp);
  console.log(slack_sig);
  console.log(request.rawBody);
  const secret = process.env.SLACK_SIGNING_SECRET;
  let time = Math.floor(new Date().getTime() / 1000);

  if (Math.abs(time - Number(timeStamp)) > 60 * 5) {
    console.log("failed tme");
    return res.status(401).send("ignored");
  }
  const sig_basestring = "v0:" + timeStamp + ":" + request.rawBody;

  const hmac =
    "v0=" +
    crypto
      .createHmac("sha256", secret as string)
      .update(sig_basestring as string)
      .digest("hex");

  console.log(
    "is Valid",
    crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(slack_sig as string))
  );

  console.log("hmac", hmac);
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
