import express, { NextFunction, Request, Response } from 'express';
import bcrypt, { hash, compare, genSaltSync } from 'bcrypt';
import { client } from "../Database/Mongo";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

import bodyParser from 'body-parser';
const users = express.Router();
const algorithm = 'RS256';
const privateKey = fs.readFileSync('./jwtRS256.key');

users.use(bodyParser.json());
users.use(bodyParser.urlencoded({ extended: true }));

// login
users.post('/login', async (request: Request, response: Response, nextFunction: NextFunction) => {
    const user = await client.db('admin').collection('users').findOne({email: request.body.email});
    if (user) {
      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
        const token = jwt.sign({subject: user.username, iss: 'typeduit', email: user.email}, privateKey, { algorithm: algorithm, expiresIn: "1h"});
        return response.send({status: 200, data: {token}});
      } 
    } 
    return response.send({status: 401, data: {message: "Wrong Email Or Password"}});
});

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
