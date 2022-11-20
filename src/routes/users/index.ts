import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import {
  createUserValidator,
  loginUserValidator,
} from "../../validations/users";

import UserController from "../../controllers/user.controller";

const usersRouter = Router();

usersRouter
  .route("")
  .post(
    expressYupMiddleware({ schemaValidator: createUserValidator }),
    UserController.store
  );

usersRouter
  .route("/login")
  .post(
    expressYupMiddleware({ schemaValidator: loginUserValidator }),
    UserController.login
  );

export default usersRouter;
