import { Sequelize } from "sequelize";
import pg from "pg";
import appConfig from "../config";

const db = appConfig.db as DbConfig; //as para hacer una aserción de tipo en una sola línea

// new Sequelize(...) crea una instancia de la clase Sequelize y configura la conexión a la db PostgreSQL
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialectModule: pg,
  dialect: "postgres",
});

// export const sequelize = new Sequelize(db.conectionString, {
//   dialectModule: pg,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

export default sequelize;

export interface DbConfig {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;
  conectionString: string;
}
