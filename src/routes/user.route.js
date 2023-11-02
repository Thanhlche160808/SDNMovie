import express from "express";
import { userController } from "../controller/index.js";
import { body } from "express-validator";


const userRouter = express.Router();

userRouter.post("/create",
[
    body("username").isLength({min: 8}).withMessage("Length of name > 5"),
    body("password").isLength({min: 8}).withMessage("Length of password > 6"),
    body("showName").isLength({min: 5}).withMessage("Length of showName > 3"),
],
userController.addAccount);

userRouter.post("/login",
[
    body("username").isLength({min: 6}).withMessage("Length of name > 5"),
    body("password").isLength({min: 8}).withMessage("Length of password > 6"),
] 
,userController.loginAccount);

userRouter.get("/refresh", userController.refreshToken)

userRouter.post("/mark", userController.markMovie);

userRouter.get("/movies", userController.getMarkMovie);

userRouter.post("/update_vip", userController.updateVip)

userRouter.get("/info/:id", userController.getInfo)

export default userRouter;