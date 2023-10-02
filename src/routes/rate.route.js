import express from "express";
import authenticate from '../middleware/auth.middleware.js';
import { rateController } from "../controller/index.js";

const rateRouter = express.Router();

rateRouter.post("/rating", rateController.addRate);

rateRouter.get("/movie/:slug", rateController.getRateMovie);

export default rateRouter;
