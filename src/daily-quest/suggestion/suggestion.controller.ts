import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

export default class DailyQuestSuggestionController {
  async getAll(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async getById(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async create(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async update(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async remove(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
