import { Request, Response } from "express";
import ShowAccountService from "../services/account/showAccount.service";

export default class AccountController {
  static async show(req: Request, res: Response) {
    const { user_id } = req;

    const account = await ShowAccountService.execute(user_id);

    return res.status(200).json(account);
  }
}
