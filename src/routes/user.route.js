import express from "express";
import { userController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';


const userRouter = express.Router();

userRouter.post("/create", userController.addAccount);

userRouter.post("/login", userController.loginAccount);

movieRouter.post("/mark", authenticate, userController.markMovie);

movieRouter.get("/movies", userController.getMarkMovie);

export default userRouter;