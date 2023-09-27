import express from "express";
import userController from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/create", userController.addAccount);
userRouter.post("/login", userController.loginAccount);
userRouter.post("/mark", userController.markMovie);
userRouter.get("/movies", userController.getMarkMovie);

export default userRouter;