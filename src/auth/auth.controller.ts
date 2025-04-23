import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export default class AuthController {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json(result);
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    res.status(StatusCodes.OK).json(result);
  }

  async googleLogin(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(StatusCodes.OK).json({
      message: "Logout successful",
    });
  }

  async refreshToken(req: Request, res: Response) {
    const result = await authService.refreshToken(req.body.refreshToken);
    res.status(StatusCodes.OK).json(result);
  }

  async requestPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async confirmPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
