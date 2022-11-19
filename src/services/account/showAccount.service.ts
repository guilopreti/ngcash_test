import { AppDataSource } from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";

export default class ShowAccountService {
  static async execute(user_id: string): Promise<Account> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError("Your account was not found.", 404);
    }

    return user.account;
  }
}
