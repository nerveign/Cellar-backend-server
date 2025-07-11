import { NextFunction, Response } from 'express';
import { AuthUserRequest, UserType } from '../types/user-type';
import { UserService } from '../service/user-service';

export class UserController {
    static async getProfile(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: UserType = await UserService.getUser(req);
            res.status(200).json({
                data: response,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteProfile(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            await UserService.deleteUser(req);
            res.clearCookie('jwt').status(200).json({
                message: 'Delete account successfully',
            });
        } catch (err) {
            next(err);
        }
    }
}
