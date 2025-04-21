import type { Request, Response } from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationService } from "@/services/validationService";
import { userService } from "@/services/userService";

export default class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, password_confirmation, name } = req.body;
      if (
        !validationService.validateRegistration(
          email,
          password,
          password_confirmation,
          res
        )
      ) {
        return;
      }

      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        res
          .status(StatusCodes.CONFLICT)
          .json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser(name, email, hashedPassword);

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }

      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(StatusCodes.CREATED).json({
        message: "User registered successfully",
        token,
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error: unknown) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      if (!validationService.validateLogin(email, password, res)) {
        return;
      }

      const user = await userService.findUserByEmail(email);

      if (!user) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid credentials" });

        return;
      }

      const isMatch = await userService.comparePasswords(
        password,
        user.password
      );
      if (!isMatch) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid credentials" });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }

      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

      res.status(StatusCodes.OK).json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error: unknown) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async googleLogin(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("token");
      res.status(StatusCodes.OK).json({
        message: "Logout successful",
      });
    } catch (error: unknown) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  async refreshToken(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async requestPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }

  async confirmPasswordReset(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: "It works!" });
  }
}
