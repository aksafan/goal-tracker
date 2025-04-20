import rateLimiter from "@/config/rateLimiter";
import xss from "@/config/xss";
import swagger from "@/config/swagger";
import db from "@/config/db";
import {
  consoleOptions as loggerConsoleOptions,
  options as loggerOptions,
} from "@/config/logger";

export default {
  rateLimiter,
  xss,
  swagger,
  db,
  loggerOptions,
  loggerConsoleOptions,
};
