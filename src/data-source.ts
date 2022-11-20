import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  synchronize: process.env.NODE_ENV === "dev" ? true : false,
  logging: true,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/*.js"]
      : ["src/entities/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : ["src/migrations/*.ts"],
});
