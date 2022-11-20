import { Router } from "express";
import TransactionController from "../../controllers/transaction.controller";
import createTransactionMiddleware from "../../middlewares/transaction/createTransaction.middleware";

import authUserMiddleware from "../../middlewares/user/authUser.middleware";

const transactionRouter = Router();

transactionRouter
  .route("")
  .post(
    authUserMiddleware,
    createTransactionMiddleware,
    TransactionController.store
  );

export default transactionRouter;
