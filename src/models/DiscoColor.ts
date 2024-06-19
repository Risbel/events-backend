import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const DiscoColor = sequelize.define("discoColor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  brandColor: {
    type: DataTypes.STRING,
  },
  bgNavbarColor: {
    type: DataTypes.STRING,
  },
  navbarForeground: {
    type: DataTypes.STRING,
  },
  h1BannerColor: {
    type: DataTypes.STRING,
  },
  bannerDescriptionColor: {
    type: DataTypes.STRING,
  },
  bannerGradientColor: {
    type: DataTypes.STRING,
  },
  titleAboutColor: {
    type: DataTypes.STRING,
  },
  bgAboutColor: {
    type: DataTypes.STRING,
  },
  buttonColor: {
    type: DataTypes.STRING,
  },
  buttonForeground: {
    type: DataTypes.STRING,
  },
  bgExperiencies: {
    type: DataTypes.STRING,
  },
  experienciesH1Color: {
    type: DataTypes.STRING,
  },
  bgTicketsSection: {
    type: DataTypes.STRING,
  },
  ticketH1Color: {
    type: DataTypes.STRING,
  },
  buttonsTicketsColor: {
    type: DataTypes.STRING,
  },
  buttonTicketForeground: {
    type: DataTypes.STRING,
  },
  bgFooterColor: {
    type: DataTypes.STRING,
  },
  foregroundFooterColor: {
    type: DataTypes.STRING,
  },
});

export default DiscoColor;
