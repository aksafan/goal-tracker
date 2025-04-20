import { Router } from "express";
import DailyQuestController from "./daily-quest.controller";

const dailyQuestRouter = Router();
const dailyQuestController = new DailyQuestController();

dailyQuestRouter.get("/", dailyQuestController.getAll);
dailyQuestRouter.post("/", dailyQuestController.create);
dailyQuestRouter.get("/for-date", dailyQuestController.getForDate);
dailyQuestRouter.patch("/:id", dailyQuestController.update);
dailyQuestRouter.delete("/:id", dailyQuestController.remove);
dailyQuestRouter.post("/:id/toggle", dailyQuestController.toggleCompletion);

export default dailyQuestRouter;
