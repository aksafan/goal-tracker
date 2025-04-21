import HttpError from "./httpError";
import { StatusCodes } from "http-status-codes";
import { ValidationErrorDetail } from "@/types/errors";
import { LogEntry } from "winston";
import { fixPrototype } from "@/utils/fixPrototype";

export default class UnprocessableEntityError extends HttpError {
  public readonly statusCode: number;
  public readonly logging: boolean = false;
  public readonly errors: ValidationErrorDetail[];
  public readonly context: Record<string, unknown>;

  constructor(params: {
    message?: string;
    errors: Array<{ field: string; message: string }>; // TODO: add proper type when validator is added
    logging?: boolean;
    context?: Record<string, unknown>;
  }) {
    const statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

    super(
      statusCode,
      params?.message || "Validation failed",
      params?.logging || false
    );

    fixPrototype(this, UnprocessableEntityError);

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

  private prepareErrors(
    errors: Array<{ field: string; message: string }>
  ): ValidationErrorDetail[] {
    const result: ValidationErrorDetail[] = [];

    for (const error of errors) {
      result.push({
        field: error.field,
        message: error.message,
      });
    }

    return result;
  }
}
