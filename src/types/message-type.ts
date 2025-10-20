import { Request } from 'express';
import { IMessage } from '../models/message-model';

export type MessageResponse = {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};

export type SendMessageRequest = {
    text: string;
    image?: string;
};

export interface AuthMessageRequest extends Request {
    userId?: string;
    body: SendMessageRequest;
}

export const toMessageResponse = (message: IMessage): MessageResponse => {
    return {
        id: message._id as string,
        senderId: message.senderId.toString(),
        receiverId: message.receiverId.toString(),
        text: message.text,
        imageUrl: message.image,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
    };
};
