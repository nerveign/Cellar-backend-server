import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express';

import { ResponseError } from '../error/response-error';
import { config } from '../config/config';
import { AuthUserRequest } from '../types/user-type';

export const protectedRoute = (
    req: AuthUserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next(new ResponseError(401, 'Unauthorized, token unavailable'));
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret) as { userId: string };
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        next(error);
    }
};
