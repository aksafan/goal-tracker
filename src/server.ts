import "dotenv/config";
import app from "@/app";
import { setupGracefulShutdown } from "@/utils/gracefulShutdown";
import { Server } from "http";

const { PORT = 8000 } = process.env;

const listener = () => console.log(`Listening on Port ${PORT}!`);
const server: Server = app.listen(PORT, listener);

setupGracefulShutdown(server);
