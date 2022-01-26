import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import qs from "qs";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  try {
    const timeStamp = req.headers["x-slack-request-timestamp"];
    const slack_sig = req.headers["x-slack-signature"];
    const body = qs.stringify(req.body, { format: "RFC1738" });

    const secret = process.env.SLACK_SIGNING_SECRET;
    let time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - Number(timeStamp)) > 60 * 5) {
      return res.status(401).send("ignored");
    }
    const sig_basestring = "v0:" + timeStamp + ":" + body;

    const hmac =
      "v0=" +
      crypto
        .createHmac("sha256", secret as string)
        .update(sig_basestring as string)
        .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(hmac),
        Buffer.from(slack_sig as string)
      )
    ) {
      return res.status(401).send("Verification failed");
    }
    return next();
  } catch (error) {
    console.log("errored", error);
    return res.status(401);
  }
};
