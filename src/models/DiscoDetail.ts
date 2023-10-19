import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoImages from "./DiscoImage";
import DiscoNetworks from "./DiscoNetworks";

const DiscoDetail = sequelize.define("discoDetail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  largeDescription: {
    type: DataTypes.TEXT,
  },
  bgImage: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
    unique: true,
  },
  administrator: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

DiscoDetail.hasMany(DiscoImages, {
  foreignKey: {
    name: "discoDetailId",
    allowNull: false,
  },
  sourceKey: "id",
});

DiscoImages.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

DiscoDetail.hasMany(DiscoNetworks, {
  foreignKey: {
    name: "discoId",
  },
  sourceKey: "id",
});
DiscoNetworks.belongsTo(DiscoDetail, {
  foreignKey: "discoId",
  targetKey: "id",
});

export default DiscoDetail;
