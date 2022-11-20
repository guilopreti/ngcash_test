import * as express from "express";
import { IAccount } from "../../interfaces/account";

export declare global {
  namespace Express {
    interface Request {
      user_id: string;
      creditedAccount_infos: IAccount;
      debitedAccount_infos: IAccount;
    }
  }
}
