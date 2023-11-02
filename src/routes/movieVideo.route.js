import { body } from "express-validator";
import { movieVideoController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const movieVideoRouter = express.Router();

movieVideoRouter.post("/create",
[
    body('name').isLength({min: 8}).withMessage("Length of name > 8"),
    body('url').isLength({min: 10}).withMessage("Length of url > 8")
],
movieVideoController.addVideo);

movieVideoRouter.get("/detail", movieVideoController.getVideo);

export default movieVideoRouter;
