import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create", userController.addAccount);
userRouter.post("/login", userController.loginAccount);

export default userRouter;