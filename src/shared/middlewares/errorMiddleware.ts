import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  response.status(status).send({
    status,
    message,
  });
};
