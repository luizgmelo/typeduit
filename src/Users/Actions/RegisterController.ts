import { NextFunction, Request, Response } from 'express';
import { registerSchema } from '../../Schemas/registerSchema';
import RegisterService from '../Services/RegisterService';

export default class RegisterController {
  constructor(private service: RegisterService) { }

  public async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const registerPayload = await registerSchema.validate(req.body);
      const dto = await this.service.handle(registerPayload);
      return res.status(200).send(dto);
    } catch (error) {
      next(error);
    }
  }
}
