import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const Subscription = sequelize.define("subscription", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	}
})

export default Subscription