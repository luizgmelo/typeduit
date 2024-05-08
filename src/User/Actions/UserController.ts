import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/UserService';

export default class UserController {
  constructor(private service: UserService) { }

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userPayload = req.headers;
      const dto = await this.service.handle(userPayload);
      return res.status(200).send(dto);
    } catch (error) {
      next(error);
    }
  }
}
