import express from "express";
import authenticate from '../middleware/auth.middleware.js';
import { movieController } from "../controller/index.js";

const movieRouter = express.Router();

movieRouter.post("/create", movieController.addMovie);

export default movieRouter;
