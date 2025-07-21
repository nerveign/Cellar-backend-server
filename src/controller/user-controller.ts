import { NextFunction, Response } from 'express';
import {
    AuthUserRequest,
    GetUserResponse,
    UpdateUserRequest,
    UserResponse,
} from '../types/user-type';
import { UserService } from '../service/user-service';

export class UserController {
    static async getUser(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const response: GetUserResponse = await UserService.getUser(req);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = req.params.id;
            const response: GetUserResponse =
                await UserService.getUserById(userId);
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

    static async updateUser(
        req: AuthUserRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest;
            const response: UserResponse = await UserService.updateUser(
                req,
                request
            );
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
