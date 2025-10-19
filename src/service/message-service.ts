import { Request, Response } from 'express';
import { AuthMessageRequest, SendMessageRequest } from '../types/message-type';
import { Message } from '../models/message-model';
import { cloudinaryStorage } from '../config/cloudinary';
import { getReceiverSocketId, io } from '../application/socket';

export class MessageService {
    static async getMessages(req: AuthMessageRequest) {
        const userToChatId = req.params.id;
        const myId = req.userId;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        return messages;
    }

    static async sendMessages(
        req: AuthMessageRequest,
        sendRequest: SendMessageRequest
    ) {
        const { text } = sendRequest;

        const userToChatId = req.params.id;
        const senderId = req.userId;

        const newMessage = new Message({
            senderId,
            receiverId: userToChatId,
            text,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(userToChatId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return newMessage;
    }
}
