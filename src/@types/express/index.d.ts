import * as express from "express";

export declare global {
  namespace Express {
    interface Request {
      user_id: string;
      creditedAccount_id: string;
      debitedAccount_id: string;
    }
  }
}
