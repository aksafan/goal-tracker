import { Router } from "express";
import TestController from "@/test-resource/test.controller";

// TODO: remove when other controllers will be implemented and no examples needed anymore
const testRouter = Router();
const testController = new TestController();

testRouter.post("/", testController.post);

export default testRouter;
