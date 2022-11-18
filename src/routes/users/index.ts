import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import createUserValidator from "../../validations/users";

import UserController from "../../controllers/user.controller";

const usersRouter = Router();

usersRouter
  .route("")
  .post(
    expressYupMiddleware({ schemaValidator: createUserValidator }),
    UserController.store
  );

export default usersRouter;
