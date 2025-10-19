import { Router } from 'express';

import authRouter from './auth-route';
import userRouter from './user-route';
import messageRouter from './message-route';

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(userRouter);
mainRouter.use(messageRouter);

export default mainRouter;
