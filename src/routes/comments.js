import { commentsController } from "../controller/index.js";
import express from "express";

const commentRouter = express.Router();

commentRouter.post("/create", commentsController.addAComments);

commentRouter.get("/movie", commentsController.getCommentsByMovie);


export default commentRouter;
