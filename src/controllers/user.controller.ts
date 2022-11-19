import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../services/users/createUser.service";
import LoginUserService from "../services/users/loginUser.service";

export default class UserController {
  static async store(req: Request, res: Response) {
    const data = req.body;

    const createUser = await CreateUserService.execute(data);

    return res.status(201).json(instanceToPlain(createUser));
  }

  static async login(req: Request, res: Response) {
    const data = req.body;

    const token = await LoginUserService.execute(data);

    return res.status(200).json(token);
  }
}
