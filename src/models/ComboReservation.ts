import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const ComboReservation = sequelize.define("comboReservation", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
	}
})

export default ComboReservation