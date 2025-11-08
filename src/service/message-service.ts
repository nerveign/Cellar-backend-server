import {
    AuthMessageRequest,
    MessageResponse,
    SendMessageRequest,
    toMessageResponse,
    UpdateMessageRequest,
} from '../types/message-type';
import { IMessage, Message } from '../models/message-model';
import { getReceiverSocketId, io } from '../application/socket';

export class MessageService {
    static async getMessages(
        req: AuthMessageRequest
    ): Promise<MessageResponse[]> {
        const userToChatId = req.params.id;
        const myId = req.userId;

        const messages: Array<IMessage> = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        return messages.map((message) => toMessageResponse(message));
    }

    static async sendMessage(
        req: AuthMessageRequest,
        sendRequest: SendMessageRequest
    ): Promise<MessageResponse> {
        const { text } = sendRequest;
        const userToChatId = req.params.id;
        const senderId = req.userId;

        const newMessage: IMessage = new Message({
            senderId,
            receiverId: userToChatId,
            text,
        }) as IMessage;

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(userToChatId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return toMessageResponse(newMessage);
    }

    static async updateMessage(
        req: AuthMessageRequest,
        updateRequest: UpdateMessageRequest
    ): Promise<MessageResponse> {
        const { text } = updateRequest.body;
        const { id } = updateRequest.params;

        const updatedMessage: IMessage = (await Message.findByIdAndUpdate(
            id,
            { text },
            { upsert: false, returnDocument: 'after' }
        )) as IMessage;

        return toMessageResponse(updatedMessage);
    }
}
