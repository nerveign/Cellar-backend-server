import express from 'express';
import { UserController } from '../controller/user-controller';

const authRouter = express.Router();

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);
authRouter.post('/logout', UserController.logout);

export default authRouter;
