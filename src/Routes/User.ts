import express, { NextFunction, Request, Response } from 'express';
import { authMiddleware } from '../Middleware/Middleware';

export const user = express.Router();

user.get('/', authMiddleware, (req: Request, res: Response) => {
  res.json(req.userInfo);
})
