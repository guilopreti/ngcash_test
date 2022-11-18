import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  return res.status(500).json({ message: "Internal server error!" });
};

export default errorHandlerMiddleware;
