import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import createTransactionValidator from "../../validations/transactions";

import TransactionController from "../../controllers/transaction.controller";

import createTransactionMiddleware from "../../middlewares/transaction/createTransaction.middleware";
import authUserMiddleware from "../../middlewares/user/authUser.middleware";

const transactionRouter = Router();

transactionRouter
  .route("")
  .post(
    expressYupMiddleware({ schemaValidator: createTransactionValidator }),
    authUserMiddleware,
    createTransactionMiddleware,
    TransactionController.store
  )
  .get(authUserMiddleware, TransactionController.index);

transactionRouter
  .route("/cashout")
  .get(authUserMiddleware, TransactionController.indexCashOut);

transactionRouter
  .route("/cashin")
  .get(authUserMiddleware, TransactionController.indexCashIn);

transactionRouter
  .route("/:transaction_id")
  .get(authUserMiddleware, TransactionController.show);

export default transactionRouter;
