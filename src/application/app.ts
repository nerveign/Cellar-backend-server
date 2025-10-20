import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from '../routes';
import { connectDB } from '../config/database';
import { errorMiddleware } from '../middlewares/error-middleware';
import { notFoundHandler } from '../middlewares/errorNotFound-middleware';

export const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());
connectDB();

// Route
app.use('/api/v1', mainRouter);

// Error Handler
app.use(errorMiddleware);

// 404 Handler
app.use(notFoundHandler);
