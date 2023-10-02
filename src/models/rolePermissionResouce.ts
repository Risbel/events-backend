import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const rolePermissionResouce = sequelize.define("rolePermissionResouce", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default rolePermissionResouce;
