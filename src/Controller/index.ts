import { Request, Response } from "express";
import { ISlackCommandBodyObject } from "./interfaces";
import services from "./services";

class AppController {
  async command(req: Request, res: Response) {
    const data: ISlackCommandBodyObject = req.body;
    if (!data.command || data.command !== "/bot") {
      return res.status(400).json({ message: "Invalid command" });
    }
    const response = await services.command(data);
    return res.status(200).json(response);
  }

  async interact(req: Request, res: Response) {
    const data = req.body;
    await services.message(JSON.parse(JSON.stringify(data.payload)));
    return res.send("Ok");
  }

  async getHistory(req: Request, res: Response) {
    const result = await services.getHistories();
    return res.status(200).json(result);
  }
}

export default new AppController();
