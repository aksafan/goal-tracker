import HttpError from "@/errors/http/httpError";
import { StatusCodes } from "http-status-codes";
import { fixPrototype } from "@/utils/fixPrototype";

export default class NotFoundError extends HttpError {
  public readonly statusCode: number;
  public readonly logging: boolean = false;
  public readonly context: Record<string, unknown>;

  constructor(params: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const statusCode = StatusCodes.NOT_FOUND;

    super(statusCode, params?.message || "Not Found", params?.logging || false);

    fixPrototype(this, NotFoundError);

    this.context = params?.context || {};
    this.statusCode = statusCode;
  }
}
