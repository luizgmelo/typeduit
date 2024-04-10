import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

const algorithm = 'RS256';
const privateKey = fs.readFileSync('./jwtRS256.key');

export const authMiddleware = function(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    console.log(bearerToken)
    jwt.verify(bearerToken, privateKey, { algorithms: [algorithm] }, (err, userInfo) => {
      if (err) {
        console.log(err);
        res.send(403).end();
        return;
      }
      req.userInfo = userInfo;
      next();
    });
  } else {
    res.sendStatus(403).end();
  }

}
