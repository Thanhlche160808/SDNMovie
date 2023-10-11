import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import {
    commentRouter,
    userRouter,
    movieRouter,
    movieSeasonRouter,
    movieVideoRouter,
    rateRouter,
    typeRouter,
    addvertisementRouter,
    watchingHistoryRouter
} from './src/routes/index.js';
import cookieParser from 'cookie-parser';
import authenticate from './src/middleware/auth.middleware.js';

dotenv.config()
const app = express();
app.use(cors());

//connect database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connect to mongoDB");
});

const httpServer = http.createServer(app);
app.use(express.json())
app.use(authenticate)
app.use(cookieParser())

app.use('/api/comment', commentRouter);
app.use('/api/movie', movieRouter);
app.use('/api/user', userRouter);
app.use("/api/movie_season", movieSeasonRouter);
app.use("/api/movie_video", movieVideoRouter);
app.use("/api/rate", rateRouter);
app.use("/api/type", typeRouter);
app.use("/api/ads", addvertisementRouter);
app.use("/api/watching_history", watchingHistoryRouter);

const PORT = process.env.PORT || 8000;


httpServer.listen(PORT, () => {
    console.log("Server in runing " + PORT);
});