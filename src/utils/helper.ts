import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (userId: string, res: Response) => {
    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId }, secret, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        ...config.cookiesOption,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};
