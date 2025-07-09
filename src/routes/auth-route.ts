import express from 'express';
import { AuthController } from '../controller/auth-controller';

const authRouter = express.Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);

export default authRouter;
