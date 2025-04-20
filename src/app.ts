import express from "express";
import favicon from "express-favicon";
import logger from "morgan";
import config from "@/config";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import sanitizeMiddleware from "@/middleware/sanitize";
import swaggerDocs from "@/utils/swagger";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { errorHandler } from "@/middleware/errorHandler";
import { defineRoutes } from "@/utils/defineRoutes";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(
  favicon(dirname(fileURLToPath(import.meta.url)) + "/public/favicon.ico")
);

// security
app.use(cors());
app.use(rateLimit(config.rateLimiter));
app.use(helmet());
app.use(sanitizeMiddleware);

// routes
defineRoutes(app);

swaggerDocs(app);

app.use(errorHandler);

export default app;
