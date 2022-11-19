import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("Missing authorization token!");
  }

  const verifyToken = token.split(" ")[1];

  jwt.verify(verifyToken, String(process.env.SECRET_KEY), (err, decoded) => {
    if (err) {
      return res.status(401).json("Invalid token!");
    }

    req.user_id = decoded?.sub as string;
    next();
  });
};

export default authUserMiddleware;
