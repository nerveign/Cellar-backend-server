import { Router } from 'express';

import { protectedRoute } from '../middlewares/auth-middleware';
import { ProfileController } from '../controller/profile-controller';

const profileRouter = Router();

profileRouter.get('/profile', protectedRoute, ProfileController.getProfile);

export default profileRouter;