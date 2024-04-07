import { client } from "../../Database/Mongo";
import User from "../../Models/UserModel";
import { LoginPayload } from "../../Schemas/loginSchema";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

const algorithm = 'RS256';
const privateKey = fs.readFileSync('./jwtRS256.key');

export default class LoginService {
  public async handle(loginPayload: LoginPayload): Promise<object> {
    const user = await client.db('admin')
      .collection<User>('users')
      .findOne({ email: loginPayload.user.email });

    if (!user) {
      return {status: 401, message: "Wrong Email or Password"}
    }

    const match = await bcrypt.compare(loginPayload.user.password, user.password);

    if (!match) {
      return {status: 401, message: "Wrong Email or Password"}
    } 

    const token = jwt.sign({subject: user.username, iss: 'typeduit', email: user.email}, privateKey, { algorithm: algorithm, expiresIn: "1h"});
    return {status: 200, message: "Authorized", token};
  }
}
