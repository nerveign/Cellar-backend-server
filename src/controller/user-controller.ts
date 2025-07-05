import { NextFunction, Request, Response } from 'express';
import { LoginUserRequest, RegisterUserRequest } from '../type/user-type';
import { UserService } from '../service/user-service';
import { generateToken } from '../utils/helper';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.register(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);

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
      UserService.logout(res);

      res.status(200).json({
        data: 'OK',
      });
    } catch (error) {
      next(error);
    }
  }
}
