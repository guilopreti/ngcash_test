import { Router } from "express";
import UserController from "../../controllers/user.controller";

const usersRouter = Router();

usersRouter.route("").post(UserController.store);

export default usersRouter;
