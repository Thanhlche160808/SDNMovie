import express from "express";
import authenticate from '../middleware/auth.middleware.js';
import { typeController } from "../controller/index.js";

const typeRouter = express.Router();

typeRouter.post("/create", typeController.addType);

typeRouter.get("/getAll", typeController.getAllType);

typeRouter.get("/movies", typeController.getMovieType);

export default typeRouter;