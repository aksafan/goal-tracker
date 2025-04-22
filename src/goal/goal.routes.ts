import { Router } from "express";
import GoalController from "./goal.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const router = Router();
const controller = new GoalController();

router.get("/", queryParamsParser, controller.getAllGoals);
router.get("/:id", controller.getGoalById);
router.post("/", controller.createGoal);
router.patch("/:id", controller.updateGoal);
router.delete("/:id", controller.deleteGoal);

router.patch("/:id/field-values", controller.updateFieldValues);

export default router;
