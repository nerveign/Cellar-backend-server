import { Request, Response } from 'express';
import { AuthMessageRequest } from '../types/message-type';
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

    static async sendMessages(req: AuthMessageRequest) {
        const { text, image } = req.body;
        const userToChatId = req.params.id;
        const senderId = req.userId;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const result = await cloudinaryStorage(req.file?.path);
            imageUrl = result.secure_url;
        }

        const newMessage = new Message({
            senderId,
            userToChatId,
            text,
            image: imageUrl,
        });

        await newMessage.save;

        const receiverSocketId = getReceiverSocketId(userToChatId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }
    }
}
