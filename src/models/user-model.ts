import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    fullName: string;
    email: string;
    profileImg: string;
    password: string;
}

const userSchema: Schema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profileImg: { type: String, default: '' },
        password: { type: String, required: true, minlength: 8 },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
