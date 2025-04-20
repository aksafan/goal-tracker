import type {
  NextFunction,
  Request,
  Response,
} from "express-serve-static-core";
import { StatusCodes } from "http-status-codes";
import { HttpError, UnprocessableEntityError } from "@/errors";

export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    const { statusCode } = err;

    if (err instanceof UnprocessableEntityError) {
      return res.status(statusCode).send({
        code: statusCode,
        message: err.message,
        errors: err.errors,
      });
    } else {
      return res.status(statusCode).send({
        code: statusCode,
        message: err.message,
      });
    }
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  });
};
