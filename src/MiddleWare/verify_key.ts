import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import qs from "qs";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  try {
    const timeStamp = req.headers["x-slack-request-timestamp"];
    const slack_sig = req.headers["x-slack-signature"];
    const body = qs.stringify(req.body, { format: "RFC1738" });

    console.log("slack_sig ", slack_sig);
    console.log("body ", body);

    const secret = process.env.SLACK_SIGNING_SECRET;
    let time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - Number(timeStamp)) > 60 * 5) {
      console.log("failed at time");
      return res.status(401).send("ignored");
    }
    const sig_basestring = "v0:" + timeStamp + ":" + body.trim();

    const hmac =
      "v0=" +
      crypto
        .createHmac("sha256", secret as string)
        .update(sig_basestring as string)
        .digest("hex");

    console.log("correct at key");
    console.log("mine", hmac);
    console.log("slack", slack_sig);

    if (
      !crypto.timingSafeEqual(
        Buffer.from(hmac),
        Buffer.from(slack_sig as string)
      )
    ) {
      console.log("failed at key");
      console.log("mine", hmac);
      console.log("slack", slack_sig);
      return res.status(401).send("Verification failed");
    }
    return next();
  } catch (error) {
    console.log("errored", error);
    return res.status(401);
  }
};
