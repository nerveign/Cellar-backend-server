import { Response } from 'express';
import { AuthUserRequest, UserType } from '../types/user-type';
import { ResponseError } from '../error/response-error';
import { User } from '../models/user-model';

export class UserService {
    static async getUser(req: AuthUserRequest): Promise<UserType> {
        const user = await User.findById(req.userId).where('-password');

        if (!user) {
            throw new ResponseError(404, 'User not found');
        }

        return {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            profileImg: user.profileImg,
            email: user.email,
        };
    }

    static async deleteUser(req: AuthUserRequest): Promise<any> {
        const user = await User.findById(req.userId);

        if (!user) {
            throw new ResponseError(404, 'User not found');
        }

        await User.deleteOne({ _id: user.id });
    }
}
