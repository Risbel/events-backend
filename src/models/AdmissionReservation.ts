import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const AdmissionReservation = sequelize.define("admissionReservation", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
	}
})

export default AdmissionReservation

