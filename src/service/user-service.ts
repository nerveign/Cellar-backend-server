import {
    AuthUserRequest,
    GetUserType,
    toUserResponse,
    UpdateUserRequest,
    UserResponse,
} from '../types/user-type';
import { ResponseError } from '../error/response-error';
import { IUser, User } from '../models/user-model';
import { string } from 'zod';

export class UserService {
    static async getUser(req: AuthUserRequest): Promise<GetUserType> {
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

    static async updateUser(
        req: AuthUserRequest,
        updateRequest: UpdateUserRequest
    ): Promise<UserResponse> {
        const user: IUser = (await User.findById(req.userId)) as IUser;

        if (!user) {
            throw new ResponseError(404, 'User not found');
        }

        const { username, fullName, email, profileImg } = updateRequest;

        const checkUsername = await User.findOne({ username });
        const checkEmail = await User.findOne({ email });

        if (checkUsername || checkEmail) {
            if (!(user.username === username || user.email === email)) {
                throw new ResponseError(
                    400,
                    'Username or Email already exists'
                );
            }
        }

        await User.updateOne(
            { _id: req.userId },
            {
                $set: {
                    username,
                    fullName,
                    email,
                    profileImg,
                },
            },
            {
                upsert: false,
            }
        );

        return {
            _id: user.id,
            username: username as string,
            fullName: fullName as string,
        };
    }
}
