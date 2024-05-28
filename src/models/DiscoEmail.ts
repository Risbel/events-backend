import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const DiscoEmail = sequelize.define("discoEmail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export default DiscoEmail;
