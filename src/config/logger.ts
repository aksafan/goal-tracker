import { format, transports } from "winston";

export const options = {
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // Write all logs error (and below) to `logs/error.log`
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    // Write to all logs with level `info` and below to `logs/app.log`
    new transports.File({ filename: "logs/app.log" }),
  ],
};

export const consoleOptions = {
  format: format.combine(format.colorize(), format.simple()),
};
