import { DataTypes } from 'sequelize'
import sequelize from '../database/database'
import AdmissionReservation from './AdmissionReservation'
import ComboReservation from './ComboReservation'

const Reservation = sequelize.define("reservation", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	}
})

export default Reservation

Reservation.hasMany(AdmissionReservation, {
	foreignKey: {
		name: 'reservationId',
		allowNull: false
	},
	sourceKey: 'id'
})
AdmissionReservation.belongsTo(Reservation, {
	foreignKey: 'reservationId',
	targetKey: 'id'
})

Reservation.hasMany(ComboReservation, {
	foreignKey: {
		name: 'reservationId',
		allowNull: false
	},
	sourceKey: 'id'
})
ComboReservation.belongsTo(Reservation, {
	foreignKey: 'reservationId',
	targetKey: 'id'
})