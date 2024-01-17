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
  secondary: {
    type: DataTypes.STRING,
  },
  bgColor: {
    type: DataTypes.STRING,
  },
  textColor: {
    type: DataTypes.STRING,
  },
});

export default DiscoColor;
