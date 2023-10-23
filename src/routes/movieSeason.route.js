import express from 'express';
import movieSeasonController from '../controller/movieSeason.controller.js';

const movieSeasonRouter = express.Router();

movieSeasonRouter.post("/create", movieSeasonController.addMovieSeason);
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