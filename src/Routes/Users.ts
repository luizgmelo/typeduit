import express, { NextFunction, Request, Response } from 'express';
import { client } from "../Database/Mongo";
const users = express.Router();

// register
users.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
  // <TO-DO> Authentication is required, Check if user is authenticate
  // <TO-DO> Apply implements user interface
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(request.body.password, salt);

  const user = {
    username: request.body.username,
    email: request.body.email,
    password: hashedPassword
  }

  await client.db('admin').collection('users').insertOne(user);

  return response.send(user);
})

export { users };
