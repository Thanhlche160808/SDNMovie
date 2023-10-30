import express from 'express';
import { watchingHistoryController } from '../controller/index.js';

const watchingHistoryRouter = express.Router();
watchingHistoryRouter.get('/:id', watchingHistoryController.getUserWatchingHistory);
export default watchingHistoryRouter;