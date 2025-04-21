import { Router } from "express";
import AuthController from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/users/register", authController.register);
authRouter.post("/users/login", authController.login);
authRouter.post("/google-login", authController.googleLogin);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/password-reset/request", authController.requestPasswordReset);
authRouter.post("/password-reset/confirm", authController.confirmPasswordReset);

export default authRouter;
