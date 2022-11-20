import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { IShowTransaction } from "../../interfaces/transactions";

export default class ShowTransactionService {
  static async execute({ user_id, transaction_id }: IShowTransaction) {
    const transactionRepository = AppDataSource.getRepository(Transaction);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError("Your account was not found.", 404);
    }

    const transaction = await transactionRepository.findOneBy({
      id: transaction_id,
    });

    if (!transaction) {
      throw new AppError("This transaction was not found.", 404);
    }

    if (
      user.account.id != transaction.debitedAccount.id &&
      user.account.id != transaction.creditedAccount.id
    ) {
      throw new AppError("You were not part of this transaction!", 401);
    }

    const allUsers = await userRepository.find();

    return {
      ...transaction,
      debitedAccount: {
        id: transaction.debitedAccount.id,
        username:
          transaction.debitedAccount.id === user.account.id
            ? user.username
            : allUsers.find(
                ({ account }) => account.id === transaction.debitedAccount.id
              )?.username,
      },
      creditedAccount: {
        id: transaction.creditedAccount.id,
        username:
          transaction.creditedAccount.id === user.account.id
            ? user.username
            : allUsers.find(
                ({ account }) => account.id === transaction.creditedAccount.id
              )?.username,
      },
    };
  }
}
