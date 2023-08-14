import { config } from 'dotenv' //importo la funcion
config() //la ejecuto para cargar mis variables de entorno definidas en un archivo .env en el objeto process.env

const db = {
	//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE
}

const originAllowed = process.env.URL_ALLOWED_CLIENT

const appConfig = {
	db,
	originAllowed
};

export default appConfig