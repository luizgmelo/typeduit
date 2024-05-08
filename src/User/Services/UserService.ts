import { client } from "../../Database/Mongo";

export default class UserService {
  public async handle(userPayload: Object): Promise<object> {
    const user = await client.db('admin')
      .collection('users')
      .findOne({ email: userPayload["Typeduit-Client-Email"]});
  
    // return user.username;
    return {"user":{
      "email": user.email,
      "token": userPayload["Typeduit-Client-Token"],
      "username": user.username,
    }}

  }
}
