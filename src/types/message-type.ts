import { Request } from 'express';

export type GetMessageResponse = {
    senderId: string;
    receiverId: string;
    text: string;
    imageUrl?: string;
};

export type SendMessageRequest = {
    text: string;
    image?: string;
};

export interface AuthMessageRequest extends Request {
    userId?: string;
    body: SendMessageRequest;
}
