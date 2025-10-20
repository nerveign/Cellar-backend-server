import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    senderId: object;
    receiverId: object;
    text: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

const messageSchema: Schema = new Schema<IMessage>(
    {
        senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

export const Message = mongoose.model<IMessage>('Message', messageSchema);
