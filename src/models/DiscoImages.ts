import { DataTypes } from 'sequelize'
import sequelize from '../database/database'

const DiscoImages = sequelize.define("discoImage", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	image: {
		type: DataTypes.STRING,
	}
})


export default DiscoImages