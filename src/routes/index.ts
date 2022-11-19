import { Router } from "express";
import accountRouter from "./accounts";
import transactionRouter from "./transactions";
import usersRouter from "./users";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/account", accountRouter);
routes.use("/transactions", transactionRouter);

export default routes;
