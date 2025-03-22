import express from "express";
import cors from "cors";
import favicon from "express-favicon";
import logger from "morgan";
import { rateLimit } from "express-rate-limit";
import config from "./config";
import helmet from "helmet";
import mainRouter from "./routes/mainRouter.js";
import xss from "xss-clean";

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
app.use(xss());

// routes
app.use("/api/v1", mainRouter);

module.exports = app;
