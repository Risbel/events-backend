import { Sequelize } from "sequelize";
import pg from "pg";
import appConfig from "../config";

const db = appConfig.db as DbConfig; //as para hacer una aserción de tipo en una sola línea

// export const sequelize = new Sequelize(db.name, db.user, db.password, {
//   host: db.host,
//   port: parseInt(db.port),
//   dialect: "postgres",
//   dialectModule: pg,
//   dialectOptions: {},
// });

export const sequelize = new Sequelize(db.conectionString, {
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;

export interface DbConfig {
  user: string;
  password: string;
  host: string;
  port: string;
  name: string;

  conectionString: string;
}
