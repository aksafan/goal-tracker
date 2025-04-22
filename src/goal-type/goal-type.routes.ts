import { Router } from "express";
import GoalTypeController from "./goal-type.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const goalTypeRouter = Router();
const goalTypeController = new GoalTypeController();

goalTypeRouter.get("/", queryParamsParser, goalTypeController.getAll);
goalTypeRouter.get("/:id", goalTypeController.getById);
goalTypeRouter.post("/", goalTypeController.create);
goalTypeRouter.patch("/:id", goalTypeController.update);
goalTypeRouter.post("/:id/fields", goalTypeController.addFields);

export default goalTypeRouter;
