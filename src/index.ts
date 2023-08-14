import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import sequelize from './database/database'

import './models/User'

import usersRoutes from './routes/user.routes'
import config from './config'
const { originAllowed }: any = config


const app = express()

app.use(
	cors({
		origin: [originAllowed]
	})
)

app.use(morgan("dev")); //muestra por consola en modo desarrollo las solicitudes y errores n casos de fallos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', usersRoutes)

const PORT = process.env.PORT || 4000

async function main() {
	try {
		await sequelize.sync({ alter: true, logging: false });
		app.listen(PORT, () => {
			console.log("server on port", PORT);
		})
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

main();