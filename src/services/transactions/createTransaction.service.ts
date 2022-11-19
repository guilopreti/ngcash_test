import { AppDataSource } from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { ITransaction } from "../../interfaces/transactions";

export default class CreateTransactionService {
  static async execute({
    username,
    user_id,
    value,
  }: ITransaction): Promise<Transaction> {
    const userRepository = AppDataSource.getRepository(User);
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const accountRepository = AppDataSource.getRepository(Account);

    const creditedUser = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!creditedUser) {
      throw new AppError("Your account was not found.", 404);
    }

    const debitedUser = await userRepository.findOneBy({ username });

    if (!debitedUser) {
      throw new AppError(
        "An account with the specified username was not found.",
        404
      );
    }

    const creditedAccount = await accountRepository.findOne({
      where: {
        id: creditedUser.account.id,
      },
    });

    const debitedAccount = await accountRepository.findOne({
      where: {
        id: debitedUser.account.id,
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

    if (creditedAccount.id === debitedAccount.id) {
      throw new AppError("You cannot make a transaction for yourself!", 403);
    }

    if (creditedAccount.balance < value) {
      throw new AppError(
        "You do not have enough income for this transaction.",
        401
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
