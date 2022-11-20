import { Request, Response } from "express";
import CreateTransactionService from "../services/transactions/createTransaction.service";
import ListTransactionsService from "../services/transactions/listTransactions.service";
import ShowTransactionService from "../services/transactions/showTransaction.service";

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

  static async index(req: Request, res: Response) {
    const { user_id } = req;

    const transactions = await ListTransactionsService.execute(user_id);

    return res.status(200).json(transactions);
  }

  static async show(req: Request, res: Response) {
    const { user_id } = req;
    const { transaction_id } = req.params;

    const transaction = await ShowTransactionService.execute({
      user_id,
      transaction_id,
    });

    return res.status(200).json(transaction);
  }
}
