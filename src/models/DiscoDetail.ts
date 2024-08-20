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
  h1BannerHeight: {
    type: DataTypes.STRING, //new
  },
  h1Weight: {
    type: DataTypes.STRING, //new
  },
  bannerDescription: {
    type: DataTypes.STRING,
  },
  bannerDescriptionHeight: {
    type: DataTypes.STRING, //new
  },
  bannerDescriptionWeight: {
    type: DataTypes.STRING, //new
  },
  dateDescription: {
    type: DataTypes.STRING, //new
  },
  dateDescriptionHeight: {
    type: DataTypes.STRING, //new
  },
  dateDescriptionWeight: {
    type: DataTypes.STRING, //new
  },
  layoutTextBanner: {
    type: DataTypes.STRING, //new
  },
  titleTextCarousel: {
    type: DataTypes.STRING,
  },
  titleTextAbout: {
    type: DataTypes.STRING,
  },
  titleTextTickets: {
    type: DataTypes.STRING,
  },
  layoutTextAbout: {
    type: DataTypes.STRING,
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
