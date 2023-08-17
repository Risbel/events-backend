import { DataTypes } from 'sequelize'
import sequelize from '../database/database'
import Subscription from './Subscription'


const DiscoRole = sequelize.define("DiscoRole", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	role: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	}
})

DiscoRole.hasMany(Subscription, {
	foreignKey: {
		name: "roleId",
		allowNull: false
	},
	sourceKey: "id"
})
Subscription.belongsTo(DiscoRole, {
	foreignKey: "roleId",
	targetKey: "id"
})

export default DiscoRole