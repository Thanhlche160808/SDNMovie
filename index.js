import express from 'express';
import * as dovten from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './src/routes/user.route.js';

dovten.config();
const app = express();

//connect database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connect to mongoDB");
});

app.get("/", (req, resp) => {
    resp.send("Ket noi thanh cong");
});


const PORT = process.env.PORT || 8000;
app.use("/api/user", userRouter);


app.listen(PORT, () => {
    console.log("Server in runing");
});