import express from "express";
import * as mainController from "../controllers/mainController";

const router = express.Router();

router.get("/", mainController.get);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserForm'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */

router.post("/", mainController.post);

export default router;
