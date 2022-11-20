import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import AppError from "../../errors/appError";

const createTransactionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, value } = req.body;
  const { user_id } = req;

  const userRepository = AppDataSource.getRepository(User);

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

  if (creditedUser.id === debitedUser.id) {
    throw new AppError("You cannot make a transaction for yourself!", 403);
  }

  if (Number(creditedUser.account.balance) < value) {
    throw new AppError(
      "You do not have enough income for this transaction.",
      401
    );
  }

  req.creditedAccount_infos = {
    id: creditedUser.account.id,
    username: creditedUser.username,
  };
  req.debitedAccount_infos = {
    id: debitedUser.account.id,
    username: debitedUser.username,
  };

  next();
};

export default createTransactionMiddleware;
