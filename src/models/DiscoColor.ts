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
  secondaryColor: {
    type: DataTypes.STRING,
  },
  bgColor: {
    type: DataTypes.STRING,
  },
  textColor: {
    type: DataTypes.STRING,
  },
  h1Color: {
    type: DataTypes.STRING,
  },
  h2Color: {
    type: DataTypes.STRING,
  },
  buttonColor: {
    type: DataTypes.STRING,
  },
  buttonForeground: {
    type: DataTypes.STRING,
  },
});

export default DiscoColor;
