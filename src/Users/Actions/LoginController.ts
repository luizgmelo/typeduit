import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../../Schemas/loginSchema';
import LoginService from '../Services/LoginService';

export default class LoginController {
  constructor(private service: LoginService) { }

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const loginPayload = await loginSchema.validate(req.body);
      const dto = await this.service.handle(loginPayload);
      return res.status(200).send(dto);
    } catch (error) {
      next(error);
    }
  }
}
