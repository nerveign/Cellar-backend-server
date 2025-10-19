import { NextFunction, Response } from 'express';
import { AuthMessageRequest } from '../types/message-type';
import { MessageService } from '../service/message-service';

export class MessageController {
    static async getMessages(
        req: AuthMessageRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response = await MessageService.getMessages(req);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async sendMessage(
        req: AuthMessageRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response = await MessageService.sendMessages(req);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
