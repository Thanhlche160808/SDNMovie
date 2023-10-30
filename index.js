import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import {
    commentRouter,
    userRouter,
    movieRouter,
    movieSeasonRouter,
    movieVideoRouter,
    rateRouter,
    typeRouter,
    addvertisementRouter,
    watchingHistoryRouter,
    commentReplyRouter
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
// app.use(authenticate)
app.use(cookieParser())

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use('/api/comment', commentRouter);
app.use('/api/movie', movieRouter);
app.use('/api/user', userRouter);
app.use("/api/movie_season", movieSeasonRouter);
app.use("/api/movie_video", movieVideoRouter);
app.use("/api/rate", rateRouter);
app.use("/api/type", typeRouter);
app.use("/api/ads", addvertisementRouter);
app.use("/api/watching_history", watchingHistoryRouter);
app.use("/api/comment_reply", commentReplyRouter);
app.use("/api/history", watchingHistoryRouter);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
    console.log(`User : ${socket.id} `);
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
    socket.on("join", (movieID) => {
        console.log(`User : ${socket.id} join : ${movieID?.movieID}`);
        socket.join(movieID?.movieID);
    });
    socket.on("send", async (data) => {
        console.log(data);
        const comments = new Comments({
            content: data?.content,
            author: data?.author,
            movie: data?.movie,
            date: moment().format(),
        });
        const savedComment = await comments.save();
        io.to(data?.movie).emit("receive", savedComment);
    });
});


httpServer.listen(PORT, () => {
    console.log("Server in runing " + PORT);
});