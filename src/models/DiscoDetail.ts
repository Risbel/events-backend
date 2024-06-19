import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoImages from "./DiscoImage";
import DiscoNetworks from "./DiscoNetworks";
import DiscoPhone from "./DiscoPhone";
import DiscoBannerImage from "./DiscoBannerImage";
import DiscoColor from "./DiscoColor";
import QuickLink from "./QuickLink";
import DiscoEmail from "./DiscoEmail";
import EventAbout from "./EventAbout";

const DiscoDetail = sequelize.define("discoDetail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  h1Banner: {
    type: DataTypes.STRING,
  },
  bannerDescription: {
    type: DataTypes.STRING,
  },
  aboutDescription: {
    type: DataTypes.TEXT,
  },
  titleTextCarousel: {
    type: DataTypes.TEXT,
  },
  titleTextAbout: {
    type: DataTypes.TEXT,
  },
  layoutTextAbout: {
    type: DataTypes.TEXT,
  },
  bgImage: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
});

DiscoDetail.hasMany(QuickLink, {
  foreignKey: {
    name: "discoDetailId",
  },
  sourceKey: "id",
});
QuickLink.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
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

DiscoDetail.hasOne(DiscoNetworks, {
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

DiscoDetail.hasMany(DiscoEmail, {
  foreignKey: {
    name: "discoDetailId",
  },
  sourceKey: "id",
});
DiscoEmail.belongsTo(DiscoDetail, {
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

DiscoDetail.hasMany(EventAbout, {
  foreignKey: "discoDetailId",
  sourceKey: "id",
});
EventAbout.belongsTo(DiscoDetail, {
  foreignKey: "discoDetailId",
  targetKey: "id",
});

export default DiscoDetail;
