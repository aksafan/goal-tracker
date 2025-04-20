import { Router } from "express";
import AuthController from "./auth.controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/google-login", authController.googleLogin);
authRouter.post("/logout", authController.logout);
authRouter.post("/password-reset/request", authController.requestPasswordReset);
authRouter.post("/password-reset/confirm", authController.confirmPasswordReset);

export default authRouter;
