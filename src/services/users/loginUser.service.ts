import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";
import { IUser } from "../../interfaces/users";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export default class LoginUserService {
  static async execute({ username, password }: IUser) {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({ username });

    if (!findUser) {
      throw new AppError("Email or password invalid!", 401);
    }

    const comparePasswordHash = await bcryptjs.compare(
      password,
      findUser.password
    );

    if (!comparePasswordHash) {
      throw new AppError("Email or password invalid!", 401);
    }

    const token = jwt.sign(
      { username: username },
      String(process.env.SECRET_KEY),
      { expiresIn: "24h", subject: findUser.id }
    );

    return { token };
  }
}
