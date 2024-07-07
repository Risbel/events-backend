import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const SuscriptionNotification = sequelize.define("suscriptionNotification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
  },
});

export default SuscriptionNotification;
