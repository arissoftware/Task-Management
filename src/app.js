import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.routers.js";
import { notFound } from "./errors/notfound.js";
import { errorHandler } from "./errors/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
