import { NextFunction, Request, RequestHandler, Response } from 'express';

// utility function to handle try and catch and req, res from controllers
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;