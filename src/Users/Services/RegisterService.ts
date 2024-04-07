import { client } from "../../Database/Mongo";
import * as bcrypt from "bcrypt";
import { RegisterPayload } from "../../Schemas/registerSchema";

export default class RegisterService {

  public async handle(registerPayload : RegisterPayload): Promise<object> {
    // <TO-DO Check if user already exists>
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(registerPayload.user.password, salt);
    registerPayload.user.password = hashedPassword;

    await client.db('admin').collection('users')
    .insertOne({
      username: registerPayload.user.username,
      email: registerPayload.user.email,
      password: registerPayload.user.password
    });

    return {status: 200, message: "Create new user successfully"};
  }
}
