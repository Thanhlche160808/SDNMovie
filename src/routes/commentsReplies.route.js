import { commentReplyController } from "../controller/index.js";
import authenticate from '../middleware/auth.middleware.js';
import express from "express";

const commentReplyRouter = express.Router();

commentReplyRouter.patch("/update_reply_comment", commentReplyController.updateComment);

export default commentReplyRouter;
