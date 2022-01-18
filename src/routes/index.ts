import express from "express";
import bot from "./bot";
import messages from "./messages";

class Router {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes(): void {
    this.router.use("/command", bot);
    this.router.use("/messages", messages);
  }
}

export default new Router().router;
