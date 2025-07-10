import { Router } from 'express';
import { protectedRoute } from '../middlewares/auth-middleware';
import { UserController } from '../controller/user-controller';

const userRouter = Router();

userRouter.get('/profile', protectedRoute, UserController.getProfile);

export default userRouter;
