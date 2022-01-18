import express from "express";
import AppController from "../Controller";
const router: express.Router = express.Router();

router.post("/", AppController.interact.bind(AppController));
export default router;
