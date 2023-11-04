import { Sequelize } from "sequelize";
import pg from "pg";
import appConfig from "../config";

const db = appConfig.db as DbConfig; //as para hacer una aserción de tipo en una sola línea

// //new Sequelize(...) crea una instancia de la clase Sequelize y configura la conexión a la db PostgreSQL
// const sequelize = new Sequelize(db.database, db.user, db.password, {
// 	host: host,
// 	dialectModule: pg,
// 	dialect: "postgres",
// });

export const sequelize = new Sequelize(db.instance_name, db.instance_user, db.instance_password, {
  host: db.instance_host,
  dialectModule: pg,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Add this option if you have issues with self-signed certificates.
    },
  },
});

export default sequelize;

export interface DbConfig {
  user: string;
  password: string;
  host: string;
  port: string;
  database: string;

  instance_user: string;
  instance_password: string;
  instance_host: string;
  instance_port: string;
  instance_name: string;
}
