import { NextFunction, Request, Response } from "express";

export const verify_key = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  if (typeof headers == "string") {
    console.log("string HEAder", JSON.parse(headers));
  } else {
    console.log(headers);
  }
  return next();
};
