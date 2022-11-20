import { Request, Response } from "express";
import CreateTransactionService from "../services/transactions/createTransaction.service";

export default class TransactionController {
  static async store(req: Request, res: Response) {
    const { value } = req.body;
    const { creditedAccount_infos, debitedAccount_infos } = req;

    const transaction = await CreateTransactionService.execute({
      value,
      creditedAccount_infos,
      debitedAccount_infos,
    });

    return res.status(201).json(transaction);
  }
}
