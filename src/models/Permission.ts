import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import rolePermissionResouce from "./rolePermissionResouce";

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Permission.hasMany(rolePermissionResouce, {
  foreignKey: {
    name: "permissionId",
    allowNull: false,
  },
  sourceKey: "id",
});

rolePermissionResouce.belongsTo(Permission, {
  foreignKey: "permissionId",
  targetKey: "id",
});

export default Permission;
