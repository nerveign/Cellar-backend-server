import { NextFunction, Response } from 'express';
import { AuthUserRequest, GetUserType } from '../types/user-type';
import { UserService } from '../service/user-service';

export class UserController {
    static async getUser(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: GetUserType = await UserService.getUser(req);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            await UserService.deleteUser(req);
            res.clearCookie('jwt').status(200).json({
                message: 'Delete account successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}
