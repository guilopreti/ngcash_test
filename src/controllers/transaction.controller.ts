import { Request, Response } from "express";
import CreateTransactionService from "../services/transactions/createTransaction.service";

export default class TransactionController {
  static async store(req: Request, res: Response) {
    const data = req.body;
    const { user_id } = req;

    const transaction = await CreateTransactionService.execute({
      ...data,
      user_id,
    });

    return res.status(201).json(transaction);
  }
}
