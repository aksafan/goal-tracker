import { createLogger, transports } from "winston";
import config from "@/config";

export const logger = createLogger(config.loggerOptions);

// Write all logs to the `console` if we're not in production
if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console(config.loggerConsoleOptions));
}
