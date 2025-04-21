import { Router } from "express";
import DailyQuestSuggestionController from "./suggestion.controller";

const suggestionRouter = Router();
const suggestionController = new DailyQuestSuggestionController();

suggestionRouter.get("/", suggestionController.getAll);
suggestionRouter.get("/:id", suggestionController.getById);
suggestionRouter.post("/", suggestionController.create);
suggestionRouter.patch("/:id", suggestionController.update);
suggestionRouter.delete("/:id", suggestionController.remove);

export default suggestionRouter;
