import { AppDataSource } from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { ICreateTransaction } from "../../interfaces/transactions";

export default class CreateTransactionService {
  static async execute({
    creditedAccount_id,
    debitedAccount_id,
    value,
  }: ICreateTransaction): Promise<Transaction> {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const accountRepository = AppDataSource.getRepository(Account);

    const creditedAccount = await accountRepository.findOne({
      where: {
        id: creditedAccount_id,
      },
    });

    const debitedAccount = await accountRepository.findOne({
      where: {
        id: debitedAccount_id,
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

    return { ...transaction, creditedAccount, debitedAccount };
  }
}
