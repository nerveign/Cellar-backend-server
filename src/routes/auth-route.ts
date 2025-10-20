import express from 'express';
import { AuthController } from '../controller/auth-controller';

const authRouter = express.Router();

authRouter.post('/auth/register', AuthController.register);
authRouter.post('/auth/login', AuthController.login);
authRouter.post('/auth/logout', AuthController.logout);

export default authRouter;
