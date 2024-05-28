import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const QuickLink = sequelize.define("quickLink", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default QuickLink;
