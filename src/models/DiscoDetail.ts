import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const DiscoDetail = sequelize.define("discoDetail", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	description: {
		type: DataTypes.STRING,
	},
	image: {
		type: DataTypes.STRING,
	},
	address: {
		type: DataTypes.STRING,
		unique: true,
	},
	slug: {
		type: DataTypes.STRING,
		unique: true,
	}
})

export default DiscoDetail