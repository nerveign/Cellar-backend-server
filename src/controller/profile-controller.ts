import { NextFunction, Response } from 'express';
import { AuthUserRequest } from '../types/user-type';
import { User } from '../models/user-model';
import { ResponseError } from '../error/response-error';

export class ProfileController {
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

            const response = {
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
