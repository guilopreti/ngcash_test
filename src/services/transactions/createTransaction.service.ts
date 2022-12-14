import { AppDataSource } from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { Transaction } from "../../entities/transactions.entity";
import AppError from "../../errors/appError";
import {
  ICreateTransaction,
  ICreateTransactionReturn,
} from "../../interfaces/transactions";

export default class CreateTransactionService {
  static async execute({
    creditedAccount_infos,
    debitedAccount_infos,
    value,
  }: ICreateTransaction): Promise<ICreateTransactionReturn> {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const accountRepository = AppDataSource.getRepository(Account);

    const creditedAccount = await accountRepository.findOne({
      where: {
        id: creditedAccount_infos.id,
      },
    });

    const debitedAccount = await accountRepository.findOne({
      where: {
        id: debitedAccount_infos.id,
      },
    });

    if (!creditedAccount) {
      throw new AppError("Your account was not found.", 404);
    }

    if (!debitedAccount) {
      throw new AppError(
        "An account with the specified username was not found.",
        404
      );
    }

    const transaction = transactionRepository.create({
      debitedAccount,
      creditedAccount,
      value,
    });

    await transactionRepository.save(transaction);

    creditedAccount.balance = Number(creditedAccount.balance) - value;

    await accountRepository.save(creditedAccount);

    debitedAccount.balance = Number(debitedAccount.balance) + value;

    await accountRepository.save(debitedAccount);

    return {
      ...transaction,
      creditedAccount: {
        id: creditedAccount.id,
        username: creditedAccount_infos.username,
      },
      debitedAccount: {
        id: debitedAccount.id,
        username: debitedAccount_infos.username,
      },
    };
  }
}
