import express from 'express';
import { watchingHistoryController } from '../controller/index.js';

const watchingHistoryRouter = express.Router();
watchingHistoryRouter.get('/', watchingHistoryController.getUserWatchingHistory);
export default watchingHistoryRouter;