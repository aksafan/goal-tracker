import { logger } from "@/utils/logger";
import { LogEntry } from "winston";
import { fixPrototype } from "@/utils/fixPrototype";

export default abstract class HttpError extends Error {
  abstract readonly statusCode: number;
  abstract readonly context: Record<string, unknown>;
  /**
   * If you need to log the current Error.
   */
  abstract readonly logging: boolean;

  private readonly _statusCode: number;

  protected constructor(statusCode: number, message: string, logging: boolean) {
    super(message);
    this._statusCode = statusCode;
    if (logging) {
      logger.log(this.getLogData());
    }

    fixPrototype(this, HttpError);
  }

  protected getLogData(): LogEntry {
    return {
      level: "error",
      statusCode: this._statusCode,
      message: this.message || "Unknown Error",
      context: this.context,
      stack: this.stack,
    };
  }
}
