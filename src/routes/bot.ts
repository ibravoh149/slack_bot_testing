import express from "express";
import AppController from "../Controller";
import { verify_key } from "../MiddleWare/verify_key";
const router: express.Router = express.Router();

router.post("/bot", verify_key, AppController.command.bind(AppController));
router.post(
  "/messages",
  verify_key,
  AppController.interact.bind(AppController)
);
export default router;
