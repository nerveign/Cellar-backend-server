import dotenv from 'dotenv';
import { CookieOptions } from 'express';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.DATABASE_URL || 'mongodb://localhost:27017/cellar-db',
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: (process.env.JWT_SECRET as string) || 'devsecrettest',
        expiresIn: process.env.JWT_EXPIRES as any,
    },
    cookiesOption: {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
    } as CookieOptions,
};
