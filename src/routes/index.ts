import { Router } from 'express';

import authRouter from './auth-route';
import userRouter from './user-route';

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);

export default mainRouter;
