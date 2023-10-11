import { commentsController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const commentRouter = express.Router();

commentRouter.post("/create", commentsController.addAComments);

commentRouter.get("/movie", commentsController.getCommentsByMovie);

commentRouter.post("/like", commentsController.likeComment);

commentRouter.post("/delete", commentsController.deleteComment);

export default commentRouter;
