import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoImages from "./DiscoImage";
import DiscoNetworks from "./DiscoNetworks";
import DiscoPhone from "./DiscoPhone";
import DiscoBannerImage from "./DiscoBannerImage";
import DiscoColor from "./DiscoColor";

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
    name: "discoDetailId",
  },
  sourceKey: "id",
});
DiscoNetworks.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

DiscoDetail.hasMany(DiscoPhone, {
  foreignKey: {
    name: "discoDetailId",
  },
  sourceKey: "id",
});
DiscoPhone.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

DiscoDetail.hasMany(DiscoBannerImage, {
  foreignKey: "discoDetailId",
  sourceKey: "id",
});
DiscoBannerImage.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

DiscoDetail.hasOne(DiscoColor, {
  foreignKey: "discoDetailId",
  sourceKey: "id",
});
DiscoColor.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

export default DiscoDetail;
