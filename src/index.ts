import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import sequelize from './database/database'

import './models/User'
import './models/Disco'
import './models/DiscoDetail'
import './models/DiscoAdmission'
import './models/Combo'
import './models/ComboDetail'
import './models/Subscription'
import './models/Reservation'
import './models/AdmissionReservation'
import './models/ComboReservation'
import './models/DiscoRole'
import './models/DiscoNetworks'

import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
import discoRoutes from './routes/discos.routes'
import discoAdmisionsRoutes from './routes/discoAdmisions.routes'
import subscriptions from './routes/subscriptions.routes'
import config from './config'

const { originAllowed }: any = config

const app = express()

app.use(
	cors({
		origin: [originAllowed],
		credentials: true
	})
)

app.use(morgan("dev")); //muestra por consola en modo desarrollo las solicitudes y errores n casos de fallos
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', usersRoutes)
app.use('/api/disco', discoRoutes)
app.use('/api/disco-admision', discoAdmisionsRoutes)
app.use('/api', authRoutes)
app.use('/api/subscription', subscriptions)

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