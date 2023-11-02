import express from "express";
import { typeController } from "../controller/index.js";
import { body } from "express-validator";

const typeRouter = express.Router();

typeRouter.post("/create",
[
    body('typeName').isLength({min: 5}).withMessage("Length of name > 1"),
],
typeController.addType);

typeRouter.get("/getAll", typeController.getAllType);

typeRouter.get("/movies", typeController.getMovieType);

export default typeRouter;