import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { HttpError, UnprocessableEntityError } from "@/errors/http";
import { logger } from "@/utils/logger";

export const errorHandler: ErrorRequestHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    const { statusCode } = err;

    if (err instanceof UnprocessableEntityError) {
      res.status(statusCode).send({
        code: statusCode,
        message: err.message,
        errors: err.errors,
      });

      return;
    } else {
      res.status(statusCode).send({
        code: statusCode,
        message: err.message,
      });

      return;
    }
  }

  logger.error(err.message || "Unknown Error", { stack: err.stack });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong",
  });
};
