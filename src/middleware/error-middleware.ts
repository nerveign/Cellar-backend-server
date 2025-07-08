import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../error/response-error';
import { ZodError } from 'zod';

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    const messages = error.issues.map((issue) => issue.message);
    res.status(400).json({
      errors: messages[0],
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({
      errors: error.message,
    });
  }
};
