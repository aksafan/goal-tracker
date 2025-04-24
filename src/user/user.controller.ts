import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";

export default class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
