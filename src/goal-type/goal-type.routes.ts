import { Router } from "express";
import GoalTypeController from "./goal-type.controller";

const goalTypeRouter = Router();
const goalTypeController = new GoalTypeController();

goalTypeRouter.get("/", goalTypeController.getAll);
goalTypeRouter.get("/:id", goalTypeController.getById);
goalTypeRouter.post("/", goalTypeController.create);
goalTypeRouter.patch("/:id", goalTypeController.update);
goalTypeRouter.post("/:id/fields", goalTypeController.addFields);

export default goalTypeRouter;
