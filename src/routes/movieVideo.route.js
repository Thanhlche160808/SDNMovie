import { movieVideoController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const movieVideoRouter = express.Router();

movieVideoRouter.post("/create", movieVideoController.addVideo);

export default movieVideoRouter;
