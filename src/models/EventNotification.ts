import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import SubscriptionNotification from "./SubscriptionNotification";

const EventNotification: any = sequelize.define("eventNotification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING,
  },
  expDate: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },
});

export default EventNotification;

EventNotification.hasMany(SubscriptionNotification, {
  foreignKey: {
    name: "eventNotificationId",
  },
  onDelete: "CASCADE",
  sourceKey: "id",
});
SubscriptionNotification.belongsTo(EventNotification, {
  foreignKey: {
    name: "eventNotificationId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  targetKey: "id",
});
