import { NextFunction, Response } from 'express';
import { AuthUserRequest, UserType } from '../types/user-type';
import { ResponseError } from '../error/response-error';
import { User } from '../models/user-model';

export class UserController {
    static async getProfile(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user = await User.findById(req.userId).where('-password');

            if (!user) {
                throw new ResponseError(404, 'User not found');
            }

            const response: UserType = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                profileImg: user.profileImg,
                email: user.email,
            };

            res.status(200).json({
                data: response,
            });
        } catch (err) {
            next(err);
        }
    }
}
