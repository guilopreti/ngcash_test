import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Account } from "./accounts.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => Account, (account) => account.receivedTransactions, {
    eager: true,
  })
  debitedAccount: Account;

  @ManyToOne((type) => Account, (account) => account.sentTransactions, {
    eager: true,
  })
  creditedAccount: Account;

  @Column({ type: "decimal", nullable: false })
  value: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt: Date;
}
