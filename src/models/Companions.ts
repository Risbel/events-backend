import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const Companion = sequelize.define("companion", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
});

export default Companion;
