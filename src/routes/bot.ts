import express from "express";
import AppController from "../Controller";
const router: express.Router = express.Router();

router.post("/bot", AppController.command.bind(AppController));
router.post("/messages", AppController.interact.bind(AppController));
export default router;
