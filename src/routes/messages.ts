import express from "express";
import AppController from "../Controller";
import { verify_key } from "../MiddleWare/verify_key";
const router: express.Router = express.Router();

router.post("/", verify_key, AppController.interact.bind(AppController));
router.get("/history", AppController.getHistory.bind(AppController));
export default router;
