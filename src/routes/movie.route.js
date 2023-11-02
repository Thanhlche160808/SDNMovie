import express from "express";
import authenticate from '../middleware/auth.middleware.js';
import { movieController } from "../controller/index.js";
import { body } from "express-validator";

const movieRouter = express.Router();

movieRouter.post("/create",
[
    body("movieName").isLength({min: 5}).withMessage("Length of name > 5"),
]
,movieController.addMovie);

movieRouter.get("/getAll", movieController.getAllMovie);

movieRouter.get("/getAllViewByMovie", movieController.getAllViewByMovie);

movieRouter.post("/add_season", movieController.addSeason);
movieRouter.get("/getAllRateByMovie", movieController.getAllRateByMovie);
movieRouter.delete("/deleteMovie", movieController.deleteMovie);

export default movieRouter;
