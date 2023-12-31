import express from 'express';
import { addvertisementController } from '../controller/index.js';

const addvertisementRouter = express.Router();

addvertisementRouter.post("/add", addvertisementController.addAdvertisement);

addvertisementRouter.get("/getAll", addvertisementController.getAllAdvertisement);

export default addvertisementRouter;