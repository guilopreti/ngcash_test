import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../services/users/createUser.service";

export default class UserController {
  static async store(req: Request, res: Response) {
    const data = req.body;
    const createUser = await CreateUserService.execute(data);
    return res.status(201).json(instanceToPlain(createUser));
  }
}
