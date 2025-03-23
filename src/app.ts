import express from "express";
import favicon from "express-favicon";
import logger from "morgan";
import config from "./config";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import sanitizeMiddleware from "./middleware/sanitize";
import mainRouter from "./routes/mainRouter";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// extra security middlewares
app.use(cors());
app.use(rateLimit(config.rateLimiter));
app.use(helmet());
app.use(sanitizeMiddleware);

// routes
app.use("/api/v1", mainRouter);

export default app;
