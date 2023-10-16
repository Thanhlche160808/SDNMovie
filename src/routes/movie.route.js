import express from "express";
import authenticate from '../middleware/auth.middleware.js';
import { movieController } from "../controller/index.js";

const movieRouter = express.Router();

movieRouter.post("/create", movieController.addMovie);

movieRouter.get("/getAll", movieController.getAllMovie);

movieRouter.get("/getAllViewByMovie", movieController.getAllViewByMovie);

movieRouter.post("/add_season", movieController.addSeason);
movieRouter.get("/getAllRateByMovie", movieController.getAllRateByMovie);

export default movieRouter;
