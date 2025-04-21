import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

export default class GoalProgressController {
  async getAllForGoal(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async add(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
