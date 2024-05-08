import express, { NextFunction, Request, Response } from 'express';
import { authMiddleware } from '../Middleware/Middleware';
import { userController } from '../User/Index';

export const user = express.Router();

user.get('/', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
  return userController.handle(req, res, next);
})
