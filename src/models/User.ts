import { DataTypes } from 'sequelize'
import sequelize from '../database/database'
import Reservation from './Reservation';
import Subscription from './Subscription';

const User = sequelize.define("User", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	imageUrl: {
		type: DataTypes.STRING,
	},
});

User.hasMany(Reservation, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	sourceKey: 'id'
})
Reservation.belongsTo(User, {
	foreignKey: 'userId',
	targetKey: 'id'
})

User.hasMany(Subscription, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	sourceKey: 'id'
})
Subscription.belongsTo(User, {
	foreignKey: 'userId',
	targetKey: 'id'
})

export default User