import { Express } from "express";

import mainRouter from "@/test-resource/test.routes";
import userRouter from "@/user/user.routes";
import authRouter from "@/auth/auth.routes";
import goalRouter from "@/goal/goal.routes";
import goalBoardImageRouter from "@/goal-board-image/goal-board-image.routes";
import goalTypeRouter from "@/goal-type/goal-type.routes";
import goalProgressRouter from "@/goal-progress/goal-progress.routes";
import dailyQuestRouter from "@/daily-quest/daily-quest.routes";
import dailyQuestSuggestionRouter from "@/daily-quest/suggestion/suggestion.routes";

const ROUTES = [
  mainRouter,
  authRouter,
  userRouter,
  goalRouter,
  goalBoardImageRouter,
  goalTypeRouter,
  goalProgressRouter,
  dailyQuestRouter,
  dailyQuestSuggestionRouter,
];

export const defineRoutes = (app: Express) => {
  ROUTES.forEach((router) => app.use("/api/v1", router));
};
