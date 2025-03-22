import express from "express";
import mainController from "../controllers/mainController";

const router = express.Router();

router.get("/", mainController.get);
router.post("/", mainController.post);

export default router;
