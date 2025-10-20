import { Router } from 'express';
import { protectedRoute } from '../middlewares/auth-middleware';
import { MessageController } from '../controller/message-controller';
import { sendImage } from '../middlewares/image-message';

const messageRouter = Router();
messageRouter.get(
    '/message/user/:id',
    protectedRoute,
    MessageController.getMessages
);
messageRouter.post(
    '/message/user/:id',
    protectedRoute,
    MessageController.sendMessage
);

export default messageRouter;
