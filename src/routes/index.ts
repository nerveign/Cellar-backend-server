import { Router } from 'express';
import authRouter from './auth-route';

const mainRouter = Router();

mainRouter.use('/api/v1', authRouter);

export default mainRouter;
