import { NextFunction, Request, Response } from 'express';
import {
    AuthUserRequest,
    LoginUserRequest,
    RegisterUserRequest,
    UserResponse,
} from '../types/user-type';
import { AuthService } from '../service/auth-service';
import { generateToken } from '../utils/generateToken';
import { ResponseError } from '../error/response-error';

export class AuthController {
    static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const request: RegisterUserRequest =
                req.body as RegisterUserRequest;
            const response: UserResponse = await AuthService.register(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response: UserResponse = await AuthService.login(request);

            if (response) {
                generateToken(response._id, res);
            }

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static logout(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.cookies.jwt) {
                throw new ResponseError(
                    401,
                    'Unauthorized, you are not logged in'
                );
            }

            AuthService.logout(res);
        } catch (error) {
            next(error);
        }
    }
}
