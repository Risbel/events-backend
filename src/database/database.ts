import { Sequelize } from "sequelize";
import pg from "pg";
import appConfig from "../config";

const db = appConfig.db as DbConfig; //as para hacer una aserción de tipo en una sola línea

export const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: 5432,
  dialect: "postgres",
  dialectModule: pg,
  pool: {
    max: 64,
    min: 2,
    acquire: 300000,
    idle: 30000,
  },
  dialectOptions: {
    ssl: true,
    native: true,
  },
});

export default sequelize;

export interface DbConfig {
  user: string;
  password: string;
  host: string;
  port: string;
  name: string;
}
