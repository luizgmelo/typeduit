import LoginService from "./Services/LoginService";
import LoginController from "./Actions/LoginController";
import RegisterService from "./Services/RegisterService";
import RegisterController from "./Actions/RegisterController";

const loginService = new LoginService()

export const loginController = new LoginController(loginService);

const registerService = new RegisterService()

export const registerController = new RegisterController(registerService)
