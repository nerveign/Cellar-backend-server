import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../error/response-error';
import jwt from 'jsonwebtoken';

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new ResponseError(401, 'Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      throw new ResponseError(401, 'Unauthorized');
    }

    next();
  } catch (error) {
    next(error);
  }
};
