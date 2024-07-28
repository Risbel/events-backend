import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import Subscription from "./Subscription";
import rolePermissionResouce from "./rolePermissionResouce";

const DiscoRole = sequelize.define("DiscoRole", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

DiscoRole.hasMany(Subscription, {
  foreignKey: {
    name: "roleId",
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
Subscription.belongsTo(DiscoRole, {
  foreignKey: "roleId",
  targetKey: "id",
  onDelete: "CASCADE",
});

DiscoRole.hasMany(rolePermissionResouce, {
  foreignKey: {
    name: "discoRoleId",
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
rolePermissionResouce.belongsTo(DiscoRole, {
  foreignKey: "discoRoleId",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default DiscoRole;
