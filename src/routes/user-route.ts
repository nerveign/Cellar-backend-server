import { Router } from 'express';
import { protectedRoute } from '../middlewares/auth-middleware';
import { UserController } from '../controller/user-controller';

const userRouter = Router();

userRouter.get('/user/profile', protectedRoute, UserController.getUser);
userRouter.delete(
    '/user/profile/delete',
    protectedRoute,
    UserController.deleteUser
);
userRouter.put(
    '/user/profile/update',
    protectedRoute,
    UserController.updateUser
);

export default userRouter;
