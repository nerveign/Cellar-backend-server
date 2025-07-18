import {
    AuthUserRequest,
    GetUserType,
    toUserResponse,
    UpdateUserRequest,
    UserResponse,
} from '../types/user-type';
import { ResponseError } from '../error/response-error';
import { IUser, User } from '../models/user-model';
import { checkUserExist } from '../utils/helper';
import { cloudinaryStorage } from '../config/cloudinary';

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
            email: user.email,
            profileImg: user.profileImg,
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

        const { fullName, email } = updateRequest;
        const username = updateRequest.username?.toLowerCase();

        await checkUserExist(username, email, req.userId);

        // if user not update the profile image
        if (!req.file) {
            const updateRequestResponse: IUser = (await User.findByIdAndUpdate(
                { _id: req.userId },
                { username, fullName, email },
                { upsert: false, returnDocument: 'after' }
            )) as IUser;

            return toUserResponse(updateRequestResponse);
        }

        const result = await cloudinaryStorage(req.file?.path);

        const updateRequestResponse: IUser = (await User.findByIdAndUpdate(
            { _id: req.userId },
            { username, fullName, email, profileImg: result.secure_url },
            { upsert: false, returnDocument: 'after' }
        )) as IUser;

        return toUserResponse(updateRequestResponse);
    }
}
