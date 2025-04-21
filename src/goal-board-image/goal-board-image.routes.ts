import { Router } from "express";
import GoalBoardImageController from "./goal-board-image.controller";

const goalBoardImageRouter = Router();
const goalBoardImageController = new GoalBoardImageController();

goalBoardImageRouter.get("/", goalBoardImageController.getAll);
goalBoardImageRouter.post("/upload", goalBoardImageController.upload);
goalBoardImageRouter.delete("/:id", goalBoardImageController.remove);

export default goalBoardImageRouter;
