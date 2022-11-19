import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { IUser } from "../../interfaces/users";

export default class CreateUserService {
  static async execute({ username, password }: IUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);
    const accountReporsitory = AppDataSource.getRepository(Account);

    const usernameAlreadyExists = await userRepository.findOne({
      where: {
        username,
      },
    });

    if (usernameAlreadyExists) {
      throw new AppError("This username already exists!");
    }

    const userAccount = accountReporsitory.create({
      balance: 100,
    });

    await accountReporsitory.save(userAccount);

    const passwordHashed = await hash(password, 10);

    const user = userRepository.create({
      username,
      password: passwordHashed,
      account: userAccount,
    });

    await userRepository.save(user);

    return user;
  }
}
