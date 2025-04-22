import { Router } from "express";
import GoalProgressController from "./goal-progress.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const goalProgressRouter = Router();
const goalProgressController = new GoalProgressController();

goalProgressRouter.get(
  "/:id/progress",
  queryParamsParser,
  goalProgressController.getGoalProgress
);
goalProgressRouter.post(
  "/:id/progress",
  goalProgressController.addGoalProgress
);

export default goalProgressRouter;
