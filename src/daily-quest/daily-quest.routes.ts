import { Router } from "express";
import DailyQuestController from "./daily-quest.controller";
import { queryParamsParser } from "@/middleware/queryParams";

const dailyQuestRouter = Router();
const dailyQuestController = new DailyQuestController();

dailyQuestRouter.get("/", queryParamsParser, dailyQuestController.getAll);
dailyQuestRouter.get("/:id", dailyQuestController.getById);
dailyQuestRouter.post("/", dailyQuestController.create);
dailyQuestRouter.get(
  "/for-date",
  queryParamsParser,
  dailyQuestController.getForDate
);
dailyQuestRouter.patch("/:id", dailyQuestController.update);
dailyQuestRouter.delete("/:id", dailyQuestController.delete);
dailyQuestRouter.post("/:id/toggle", dailyQuestController.toggleCompletion);

export default dailyQuestRouter;
