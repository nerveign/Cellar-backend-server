import { Router } from 'express';

import authRouter from './auth-route';
import profileRouter from './profile-route';

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(profileRouter);

export default mainRouter;
