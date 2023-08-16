import { DataTypes } from 'sequelize'
import sequelize from '../database/database'
import AdmissionReservation from './AdmissionReservation'

const DiscoAdmission = sequelize.define("DiscoAdmission", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	price: {
		type: DataTypes.DECIMAL,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
})

export default DiscoAdmission

DiscoAdmission.hasMany(AdmissionReservation, {
	foreignKey: {
		name: 'discoAdmissionId',
		allowNull: false
	},
	sourceKey: 'id'
})
AdmissionReservation.belongsTo(DiscoAdmission, {
	foreignKey: 'discoAdmissionId',
	targetKey: 'id'
})