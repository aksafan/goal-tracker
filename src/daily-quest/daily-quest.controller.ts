import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

export default class DailyQuestController {
  async getAll(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async create(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async getForDate(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async update(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async remove(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async toggleCompletion(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
