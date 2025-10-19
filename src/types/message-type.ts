import { Request } from 'express';

export type GetMessageResponse = {
    senderId: string;
    receiverId: string;
    text: string;
    imageUrl?: string;
};

export interface AuthMessageRequest extends Request {
    userId?: string;
}
