import { Router } from "express";
import TransactionController from "../../controllers/transaction.controller";

import authUserMiddleware from "../../middlewares/user/authUser.middleware";

const transactionRouter = Router();

transactionRouter
  .route("")
  .post(authUserMiddleware, TransactionController.store);

export default transactionRouter;
