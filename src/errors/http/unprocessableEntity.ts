import HttpError from "@/errors/http/httpError";
import { StatusCodes } from "http-status-codes";
import { ValidationErrorDetail } from "@/types/errors";
import { LogEntry } from "winston";
import { FlattenedFieldErrors } from "@/types/zod";

export default class UnprocessableEntityError extends HttpError {
  public readonly statusCode: number;
  public readonly logging: boolean = false;
  public readonly errors: ValidationErrorDetail[];
  public readonly context: Record<string, unknown>;

  constructor(params: {
    message?: string;
    errors: FlattenedFieldErrors;
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

    super(
      statusCode,
      params?.message || "Validation failed",
      params?.logging || false
    );

    this.context = params?.context || {};
    this.statusCode = statusCode;
    this.errors = this.prepareErrors(params?.errors);
  }

  protected getLogData(): LogEntry {
    return {
      ...super.getLogData(),
      ...{ errors: this.errors },
    };
  }

  private prepareErrors(errors: FlattenedFieldErrors): ValidationErrorDetail[] {
    const result: ValidationErrorDetail[] = [];

    for (const error in errors) {
      result.push({
        field: error,
        message: errors[error] ? errors[error].join(", ") : "Unknown error",
      });
    }

    return result;
  }
}
