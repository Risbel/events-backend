import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import rolePermissionResouce from "./rolePermissionResouce";

const Resource = sequelize.define("Resource", {
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

Resource.hasMany(rolePermissionResouce, {
  foreignKey: {
    name: "resourceId",
    allowNull: false,
  },
  sourceKey: "id",
});

rolePermissionResouce.belongsTo(Resource, {
  foreignKey: {
    name: "resourceId",
  },
  targetKey: "id",
});

export default Resource;
