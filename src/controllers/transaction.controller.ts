import { Request, Response } from "express";
import CreateTransactionService from "../services/transactions/createTransaction.service";

export default class TransactionController {
  static async store(req: Request, res: Response) {
    const { value } = req.body;
    const { creditedAccount_id, debitedAccount_id } = req;

    const transaction = await CreateTransactionService.execute({
      value,
      creditedAccount_id,
      debitedAccount_id,
    });

    return res.status(201).json(transaction);
  }
}
