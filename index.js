import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { commentRouter } from './src/routes/index.js'

dotenv.config()
const app = express();

//connect database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connect to mongoDB");
});

const httpServer = http.createServer(app);
app.use(express.json())

app.use('/api/comment', commentRouter)


const PORT = process.env.PORT || 8000;


httpServer.listen(PORT, () => {
    console.log("Server in runing " + PORT);
});