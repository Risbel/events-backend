import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const SubscriptionNotification = sequelize.define("subscriptionNotification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default SubscriptionNotification;
