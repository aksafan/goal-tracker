import type { Server } from "http";
import { prisma } from "@/db/prisma";

export const setupGracefulShutdown = (server: Server): void => {
  const shutdown = async (reason: string, err?: unknown): Promise<void> => {
    console.log("\n[shutdown] Shutting down gracefully...");
    console.log(`[shutdown] Reason: ${reason}`);

    if (err) {
      console.error("[shutdown] Error:", err);
    }

    try {
      console.log("[shutdown] Disconnecting Prisma...");
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("[shutdown] Prisma disconnect error:", disconnectError);
    }

    server.close(() => {
      console.log("[shutdown] Server closed. Bye 👋");
      process.exit(err ? 1 : 0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT (Ctrl+C)"));
  process.on("SIGTERM", () => shutdown("SIGTERM (e.g. Docker stop)"));
  process.on("uncaughtException", (err) => shutdown("Uncaught Exception", err));
  process.on("unhandledRejection", (reason) =>
    shutdown("Unhandled Rejection", reason)
  );
};
