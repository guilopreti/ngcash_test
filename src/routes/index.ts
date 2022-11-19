import { Router } from "express";
import accountRouter from "./accounts";
import usersRouter from "./users";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/account", accountRouter);

export default routes;
