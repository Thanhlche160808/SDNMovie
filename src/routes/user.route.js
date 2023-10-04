import express from "express";
import { userController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';


const userRouter = express.Router();

userRouter.post("/create", userController.addAccount);

userRouter.post("/login", userController.loginAccount);

export default userRouter;