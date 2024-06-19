import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const EventAbout = sequelize.define("eventAbout", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  titleColor: {
    type: DataTypes.STRING,
  },
  titleAlign: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  textAlign: {
    type: DataTypes.STRING,
  },
  textColor: {
    type: DataTypes.STRING,
  },
  textWeight: {
    type: DataTypes.STRING,
  },
});

export default EventAbout;
