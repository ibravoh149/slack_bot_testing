import { request, Request, response, Response } from "express";
import { ISlackCommandBodyObject } from "./interfaces";
import services from "./services";

class AppController {
  async command(req: Request, res: Response) {
    const data: ISlackCommandBodyObject = req.body;
    if (!data.command || data.command !== "/bot") {
      return res.status(400).json({ message: "Invalid command" });
    }
    const response = await services.command(data);
    return res.json(response).json(200);
  }

  async interact(req: Request, res: Response) {
    console.log(req.body);
  }
}

export default new AppController();
