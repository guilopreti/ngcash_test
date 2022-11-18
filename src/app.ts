import "express-async-errors";
import express from "express";
import "reflect-metadata";
import errorHandlerMiddleware from "./middlewares/error/errorHandler.middleware";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandlerMiddleware);

export default app;
