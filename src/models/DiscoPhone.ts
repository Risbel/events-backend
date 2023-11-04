import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const DiscoPhone = sequelize.define("discoPhone", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
  },
});

export default DiscoPhone;
