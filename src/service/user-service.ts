import {
    AuthUserRequest,
    GetUserResponse,
    toGetUserResponse,
    toUserResponse,
    UpdateUserRequest,
    UserResponse,
} from '../types/user-type';
import { ResponseError } from '../error/response-error';
import { IUser, User } from '../models/user-model';
import { checkUserExist } from '../utils/helper';
import { cloudinaryStorage } from '../config/cloudinary';
import { Validation } from '../validation/validation';
import { AuthValidation } from '../validation/auth-validation';

const getUserData = async (userId?: string): Promise<IUser> => {
    const user: IUser = (await User.findById(userId)) as IUser;

    if (!user) {
        throw new ResponseError(404, 'User not found');
    }

    return user;
};

export class UserService {
    static async getUser(req: AuthUserRequest): Promise<GetUserResponse> {
        const user: IUser = await getUserData(req.userId);

        return toGetUserResponse(user);
    }

    static async getUserById(userId: string): Promise<GetUserResponse> {
        const user: IUser = await getUserData(userId);

        return toGetUserResponse(user);
    }

    static async getAllUser(): Promise<Array<GetUserResponse>> {
        const users: Array<IUser> = (await User.find(
            {},
            { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        )) as Array<IUser>;

        return users.map((user) => toGetUserResponse(user));
    }

    static async deleteUser(req: AuthUserRequest): Promise<any> {
        const user: IUser = await getUserData(req.userId);

        await User.deleteOne({ _id: user.id });
    }

    static async updateUser(
        req: AuthUserRequest,
        updateRequest: UpdateUserRequest
    ): Promise<UserResponse> {
        const updateUserRequest: UpdateUserRequest = Validation.validate(
            AuthValidation.UPDATE,
            updateRequest
        );
        const { fullName, email } = updateUserRequest;
        const username = updateUserRequest.username?.toLowerCase();

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
