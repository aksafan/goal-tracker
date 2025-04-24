import { Router } from "express";
import GoalBoardImageController from "./goal-board-image.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const goalBoardImageRouter = Router();
const goalBoardImageController = new GoalBoardImageController();

goalBoardImageRouter.get(
  "/",
  queryParamsParser,
  goalBoardImageController.getAll
);
goalBoardImageRouter.post("/upload", goalBoardImageController.upload);
goalBoardImageRouter.delete("/:id", goalBoardImageController.remove);

export default goalBoardImageRouter;
