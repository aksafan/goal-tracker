import type { Response } from "express-serve-static-core";

import { isEmailValid } from "@/utils/auth/isEmailValid";
import { isPasswordValid } from "@/utils/auth/isPasswordValid";
import { StatusCodes } from "http-status-codes";

class ValidationService {
  validateRegistration(
    email: string,
    password: string,
    password_confirmation: string,
    res: Response
  ): boolean {
    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email and password are required" });
      return false;
    }
    if (!isEmailValid(email)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email" });
      return false;
    }
    if (!isPasswordValid(password, password_confirmation)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid password" });
      return false;
    }
    
    return true;
  }

  validateLogin(email: string, password: string, res: Response): boolean {
    if (!email || !password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email and password are required" });
      return false;
    }
    if (!isEmailValid(email)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email format" });
      return false;
    }

    return true;
  }
}

export const validationService = new ValidationService();
