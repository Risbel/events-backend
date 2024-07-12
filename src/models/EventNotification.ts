import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import SuscriptionNotification from "./SuscriptionNotification";

const EventNotification = sequelize.define("eventNotification", {
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

EventNotification.hasMany(SuscriptionNotification, {
  foreignKey: {
    name: "eventNotificationId",
  },
  sourceKey: "id",
});
SuscriptionNotification.belongsTo(EventNotification, {
  foreignKey: "eventNotificationId",
  targetKey: "id",
});
