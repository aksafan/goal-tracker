import express from "express";
import * as mainController from "@/test-resource/test.controller";

const router = express.Router();

router.get("/", mainController.get);

router.post("/", mainController.post);

export default router;
