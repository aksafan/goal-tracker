import { Router } from "express";
import UserController from "./user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/profile", userController.getProfile);
userRouter.patch("/profile", userController.updateProfile);

export default userRouter;
