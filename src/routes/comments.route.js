import { body } from "express-validator";
import { commentsController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const commentRouter = express.Router();

commentRouter.post("/create",
[
    body('author').isLength({min: 5}).withMessage("Length of author > 5")
]

,commentsController.addAComments);

commentRouter.get("/movie", commentsController.getCommentsByMovie);

commentRouter.post("/like", commentsController.likeComment);

commentRouter.post("/delete", commentsController.deleteComment);

commentRouter.patch("/update_comment", commentsController.updateComment);

commentRouter.post("/reply", commentsController.replyComment);

commentRouter.post("/report_comment", commentsController.reportComment);

export default commentRouter;
