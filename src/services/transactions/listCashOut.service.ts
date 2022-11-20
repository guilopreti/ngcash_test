import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";

export default class ListCashOutService {
  static async execute(user_id: string) {
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

    const transactions = await transactionRepository.find();

    if (!transactions) {
      throw new AppError("There aren't registered transactions.", 409);
    }

    const userCashOutTransactions = transactions.filter(
      ({ creditedAccount }) => creditedAccount.id === user.account.id
    );

    if (!userCashOutTransactions) {
      throw new AppError(
        "You have no records of this type of transaction",
        409
      );
    }

    const allUsers = await userRepository.find();

    const transactionsReturn = userCashOutTransactions.map((transaction) => {
      return {
        ...transaction,
        debitedAccount: {
          id: transaction.debitedAccount.id,
          username: allUsers.find(
            ({ account }) => account.id === transaction.debitedAccount.id
          )?.username,
        },
        creditedAccount: {
          id: transaction.creditedAccount.id,
          username: user.username,
        },
      };
    });

    return transactionsReturn;
  }
}
