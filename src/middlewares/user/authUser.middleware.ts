import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../../errors/appError";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing authorization token!", 401);
  }

  const verifyToken = token.split(" ")[1];

  jwt.verify(verifyToken, String(process.env.SECRET_KEY), (err, decoded) => {
    if (err) {
      throw new AppError("Invalid token!", 401);
    }

    req.user_id = decoded?.sub as string;
    next();
  });
};

export default authUserMiddleware;
