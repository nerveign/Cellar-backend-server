import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import mainRouter from '../routes';
import { connectDB } from '../config/database';
import { errorMiddleware } from '../middlewares/error-middleware';

export const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());

// Route
app.use(mainRouter);

// Error Handler
app.use(errorMiddleware);
