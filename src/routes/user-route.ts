import express from 'express';
import { UserController } from '../controller/user-controller';

const userRouter = express.Router();

userRouter.post('/api/v1/register', UserController.register);
userRouter.post('/api/v1/login', UserController.login);
userRouter.post('/api/v1/logout', UserController.logout);

export default userRouter;
