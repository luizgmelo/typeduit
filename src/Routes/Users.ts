import express, { NextFunction, Request, Response } from 'express';
import bcrypt, { hash, compare, genSaltSync } from 'bcrypt';
import { client } from "../Database/Mongo";
import { loginController } from '../Users/Index';
import { registerController } from '../Users/Index';
import { authMiddleware } from '../Middleware/Middleware';

import bodyParser from 'body-parser';
import RegisterController from '../Users/Actions/RegisterController';
const users = express.Router();

users.use(bodyParser.json());
users.use(bodyParser.urlencoded({ extended: true }));

users.get('/auth', authMiddleware, (req: Request, res: Response) => {
  res.json(req.userInfo)
  // res.send({ status: 200, message: "Login Successfully"})
})

// login
users.post('/login', (req: Request, res: Response, next: NextFunction) => {
  return loginController.handle(req, res, next);
});

// register
users.post('/', async (req: Request, res: Response, next: NextFunction) => {
  return registerController.handle(req, res, next);
});

export { users };
