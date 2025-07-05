import express from 'express';
import dotenv from 'dotenv';
import userRouter from '../routes/user-route';
import cors from 'cors';
import { connectDB } from '../config/database';
import { errorMiddleware } from '../middleware/error-middleware';

export const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(userRouter);
app.use(errorMiddleware);
