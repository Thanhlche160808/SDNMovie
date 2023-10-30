import { movieVideoController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const movieVideoRouter = express.Router();

movieVideoRouter.post("/create", movieVideoController.addVideo);

movieVideoRouter.get("/detail", movieVideoController.getVideo);

export default movieVideoRouter;
