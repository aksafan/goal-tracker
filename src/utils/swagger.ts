import type { Express, Request, Response } from "express-serve-static-core";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "@/config";

const swaggerSpec = swaggerJsdoc(config.swagger);

const swaggerDocs = (app: Express): void => {
  // Swagger UI page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API endpoint for Swagger docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  const { PORT = 8000 } = process.env;

  console.info(`Docs available at http://localhost:${PORT}/docs`);
};

export default swaggerDocs;
