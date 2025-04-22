import HttpError from "@/errors/http/httpError";
import { StatusCodes } from "http-status-codes";
import { fixPrototype } from "@/utils/fixPrototype";

export default class ExpectationFailedError extends HttpError {
  public readonly statusCode: number;
  public readonly logging: boolean = false;
  public readonly context: Record<string, unknown>;

  constructor(params: {
    message?: string;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const statusCode = StatusCodes.EXPECTATION_FAILED;

    super(
      statusCode,
      params?.message || "Bad request",
      params?.logging || false
    );

    fixPrototype(this, ExpectationFailedError);

    this.context = params?.context || {};
    this.statusCode = statusCode;
  }
}
