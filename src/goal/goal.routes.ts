import { Router } from "express";
import GoalController from "./goal.controller";

const router = Router();
const controller = new GoalController();

router.get("/", controller.getAllGoals);
router.get("/:id", controller.getGoalById);
router.post("/", controller.createGoal);
router.patch("/:id", controller.updateGoal);
router.delete("/:id", controller.deleteGoal);

router.patch("/:id/field-values", controller.updateFieldValues);

export default router;
