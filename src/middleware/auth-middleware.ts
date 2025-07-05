import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../error/response-error';

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ResponseError(401, 'Unauthorized, token unavailable');
    }
    next();
  } catch (error) {
    next(error);
  }
};
