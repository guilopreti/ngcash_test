import { Router } from "express";

import AccountController from "../../controllers/account.controller";

import authUserMiddleware from "../../middlewares/user/authUser.middleware";

const accountRouter = Router();

accountRouter.route("").get(authUserMiddleware, AccountController.show);

export default accountRouter;
