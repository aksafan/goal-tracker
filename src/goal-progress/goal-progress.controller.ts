import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import GoalProgressService from "@/goal-progress/goal-progress.service";

export default class GoalProgressController {
  private goalProgressService: GoalProgressService = new GoalProgressService();

  getGoalProgress = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // const progress = await this.goalProgressService.getProgress(
    //   req.params.goalId,
    //   req.user.id
    // );
    // res.status(StatusCodes.OK).json({ data: progress });
  };

  addGoalProgress = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json({ message: "It works!" });
    // const entry = await this.goalProgressService.addProgress(
    //   req.params.goalId,
    //   req.body,
    //   req.user.id
    // );
    // res.status(StatusCodes.CREATED).json({ data: entry });
  };
}
