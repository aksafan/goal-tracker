import { Router } from "express";
import GoalProgressController from "./goal-progress.controller";

const goalProgressRouter = Router();
const goalProgressController = new GoalProgressController();

goalProgressRouter.get("/:id/progress", goalProgressController.getGoalProgress);
goalProgressRouter.post(
  "/:id/progress",
  goalProgressController.addGoalProgress
);

export default goalProgressRouter;
