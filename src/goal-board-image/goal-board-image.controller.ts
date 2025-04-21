import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

export default class GoalBoardImageController {
  async getAll(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async upload(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async remove(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
