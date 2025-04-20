import { Router } from "express";
import GoalProgressController from "./goal-progress.controller";

const goalProgressRouter = Router();
const goalProgressController = new GoalProgressController();

goalProgressRouter.get("/:goalId", goalProgressController.getAllForGoal);
goalProgressRouter.post("/:goalId", goalProgressController.add);

export default goalProgressRouter;
