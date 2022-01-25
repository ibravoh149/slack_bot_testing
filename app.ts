import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import routes from "./src/routes";
import * as dotenv from "dotenv";
import { applyMiddleware } from "./src/MiddleWare/applyMiddleware";
import errorHandlers from "./src/MiddleWare/errorHandlers";
import { connect } from "./src/connection";

dotenv.config();

process.on("uncaughtException", (e) => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  console.log(e);
  process.exit(1);
});

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middlewareConfig();
    this.routeConfig();
    connect();
    applyMiddleware(errorHandlers, this.express);
  }

  private middlewareConfig(): void {
    this.express.use(
      express.json({
        verify: (req, res, buff, encoding) => {
          const request: any = req;
          request.rawBody = buff.toString("utf-8");
          req = request;
        },
      })
    );
    this.express.use(express.urlencoded({ extended: true }));
    // this.express.use(express.raw())
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(compression());
    this.express.use(helmet());
    this.express.enable("trust proxy");
    this.express.disable("x-powered-by");
  }

  private routeConfig(): void {
    this.express.use(routes);
    this.express.get("*", (req: express.Request, res: express.Response) => {
      res.status(404).json({ data: "Make sure url is correct!!" });
    });
  }
}

export default new App().express;
