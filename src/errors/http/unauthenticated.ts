import HttpError from "@/errors/http/httpError";
import { StatusCodes } from "http-status-codes";

export default class UnauthenticatedError extends HttpError {
  public readonly statusCode: number;
  public readonly logging: boolean = false;
  public readonly context: Record<string, unknown>;

  constructor(params: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const statusCode = StatusCodes.UNAUTHORIZED;

    super(
      statusCode,
      params?.message || "Bad request",
      params?.logging || false
    );

    this.context = params?.context || {};
    this.statusCode = statusCode;
  }
}
