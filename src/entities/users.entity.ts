import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Account } from "./accounts.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", nullable: false })
  username: string;

  @Exclude()
  @Column({ type: "varchar", nullable: false })
  password: string;

  @OneToOne((type) => Account, { eager: true })
  @JoinColumn()
  account: Account;
}
