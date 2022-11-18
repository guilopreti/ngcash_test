import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Transaction } from "./transactions.entity";

@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "decimal", nullable: false })
  balance: number;

  @OneToMany((type) => Transaction, (transaction) => transaction.debitedAccount)
  receivedTransactions: Transaction[];

  @OneToMany(
    (type) => Transaction,
    (transaction) => transaction.creditedAccount
  )
  sentTransactions: Transaction[];
}
