import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Routes from "./Routes/routes.js";
import cors from "cors";

dotenv.config()
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const port = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected successfully")
    })
    .catch((err) => {
        console.log("Mongodb server: ", err);

    })

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});
app.use("/api", Routes);

// error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})