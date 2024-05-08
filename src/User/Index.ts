import UserController from "./Actions/UserController";
import UserService from "./Services/UserService";

const userService = new UserService() 

export const userController = new UserController(userService);
