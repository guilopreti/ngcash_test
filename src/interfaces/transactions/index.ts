import { IAccount } from "../account";

export interface ICreateTransaction {
  creditedAccount_infos: IAccount;
  debitedAccount_infos: IAccount;
  value: number;
}

export interface ICreateTransactionReturn {
  id: string;
  value: number;
  createdAt: object;
  debitedAccount: IAccount;
  creditedAccount: IAccount;
}

export interface IShowTransaction {
  user_id: string;
  transaction_id: string;
}
