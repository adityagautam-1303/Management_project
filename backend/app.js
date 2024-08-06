import express from "express"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbconnection } from "./database/dbconnection.js ";
import messageRouter  from "./router/messageRouter.js"
import e from "express";
import {errorMiddleware} from './Middlewares/ErrorMiddlewares.js'
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
const app=express();
import cors from "cors";
config({path:"./config/config.env"})

const corsOptions = {
    origin: ['http://localhost:5173'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment",appointmentRouter);

dbconnection();
app.use(errorMiddleware);
export default app;