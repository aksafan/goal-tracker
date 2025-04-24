import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";
import { UnauthenticatedError } from "@/errors";
import { jwtTokenService } from "@/services/JwtTokenService";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError({
      message: "Authentication failed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId } = jwtTokenService.verifyAccessToken(token);
    
    req.user = { id: userId };

    next();
  } catch {
    throw new UnauthenticatedError({
      message: "Authentication failed",
    });
  }
};
