import { Sequelize } from 'sequelize'
import pg from 'pg'
import appConfig from '../config'

import { DbConfig } from '../types'

const db = appConfig.db as DbConfig;  //as para hacer una aserción de tipo en una sola línea

const { database, user, password, host } = db;

//new Sequelize(...) crea una instancia de la clase Sequelize y configura la conexión a la db PostgreSQL
const sequelize = new Sequelize(database, user, password, {
	host: host,
	dialectModule: pg,
	dialect: "postgres",
});

//export const sequelize = new Sequelize(db.connectionString, {
//   dialectModule: pg,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false, // Add this option if you have issues with self-signed certificates.
//     },
//   },
// });

export default sequelize