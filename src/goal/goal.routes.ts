import { Router } from "express";
import GoalController from "./goal.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const router = Router();
const goalController = new GoalController();

router.get("/", queryParamsParser, goalController.getAll);
router.get("/:id", goalController.getById);
router.post("/", goalController.create);
router.patch("/:id", goalController.update);
router.delete("/:id", goalController.delete);

router.patch("/:id/field-values", goalController.updateFieldValues);

export default router;
