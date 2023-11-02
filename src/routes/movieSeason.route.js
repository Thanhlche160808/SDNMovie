import express from 'express';
import movieSeasonController from '../controller/movieSeason.controller.js';
import { body } from 'express-validator';

const movieSeasonRouter = express.Router();

movieSeasonRouter.post("/create",
[
    //name, content, totalChap, datePub,
    body("name").isLength({min: 5}).withMessage("Length of name > 5"),
    body("content").isLength({min: 5}).withMessage("Length of content > 5"),
    body("totalChap").isInt({min: 1}).withMessage("totalChap must be integer and > 0"),
]
,movieSeasonController.addMovieSeason);

movieSeasonRouter.get("/getAll", movieSeasonController.getAllMovie);
movieSeasonRouter.get("/detail/:slug", movieSeasonController.getDetail);

movieSeasonRouter.post("/view", movieSeasonController.viewMovie);
movieSeasonRouter.get("/home", movieSeasonController.getMovieHome);
movieSeasonRouter.get("/search", movieSeasonController.getMovieByName);
movieSeasonRouter.get("/type", movieSeasonController.getMovieByType);
movieSeasonRouter.get("/hot", movieSeasonController.getHotAndView);
movieSeasonRouter.get("/filter", movieSeasonController.getFillterMovie);
movieSeasonRouter.get("/get10highestMovie", movieSeasonController.get10highestMovie);
movieSeasonRouter.delete("/delete/:slug", movieSeasonController.deleteMovieSeason);

export default movieSeasonRouter;