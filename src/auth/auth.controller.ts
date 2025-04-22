import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { authValidationService } from "@/services/AuthValidationService";
import { LoginForm, RegisterForm } from "./auth.types";
import { passwordService } from "@/services/PasswordService";
import { userService } from "@/user/user.service";
import {
  UnauthenticatedError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "@/errors";
import { jwtTokenService } from "@/services/JwtTokenService";

export default class AuthController {
  async register(req: Request<unknown, unknown, RegisterForm>, res: Response) {
    const { email, password, name } = req.body;

    authValidationService.validateRegistration(req.body);

    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      throw new UnprocessableEntityError({
        message: "User already exists",
        errors: [
          {
            field: "email",
            message: "User with this email already exists",
          },
        ],
      });
    }

    const hashedPassword = await passwordService.hash(password);
    const newUser = await userService.createUser(name, email, hashedPassword);

    const { accessToken, refreshToken } = jwtTokenService.generateTokenPair({
      userId: newUser.id,
    });

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
      user: { id: newUser.id, email: newUser.email },
    });
  }

  async login(req: Request<unknown, unknown, LoginForm>, res: Response) {
    const { email, password } = req.body;

    authValidationService.validateLogin(req.body);

    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError({
        message: "Invalid email or password",
      });
    }

    const isMatch = await passwordService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError({
        message: "Invalid email or password",
      });
    }

    const { accessToken, refreshToken } = jwtTokenService.generateTokenPair({
      userId: user.id,
    });

    res.status(StatusCodes.OK).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name },
    });
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
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new UnauthenticatedError({ message: "Missing refresh token" });
    }

    let payload;
    try {
      payload = jwtTokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthenticatedError({
        message: "Invalid or expired refresh token",
      });
    }

    const newAccessToken = jwtTokenService.generateAccessToken({
      userId: payload.userId,
    });

    res.status(200).json({ accessToken: newAccessToken });
  }

  async requestPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async confirmPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
