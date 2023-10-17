import express from "express";
import { userController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';


const userRouter = express.Router();

userRouter.post("/create", userController.addAccount);

userRouter.post("/login", userController.loginAccount);

userRouter.get("/refresh", userController.refreshToken)

userRouter.post("/mark", userController.markMovie);

userRouter.get("/movies", userController.getMarkMovie);

userRouter.post("/update_vip", userController.updateVip)

export default userRouter;