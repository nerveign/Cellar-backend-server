import { Router } from 'express';
import { protectedRoute } from '../middlewares/auth-middleware';
import { UserController } from '../controller/user-controller';
import { uploadPhoto } from '../middlewares/multer-middleware';

const userRouter = Router();

userRouter.get('/user/', protectedRoute, UserController.getAllUser);
userRouter.get('/user/profile', protectedRoute, UserController.getUser);
userRouter.get('/user/profile/:id', protectedRoute, UserController.getUserById);
userRouter.delete(
    '/user/profile/delete',
    protectedRoute,
    UserController.deleteUser
);
userRouter.patch(
    '/user/profile/update',
    protectedRoute,
    uploadPhoto,
    UserController.updateUser
);

export default userRouter;
