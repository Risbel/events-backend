import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const DiscoNetworks = sequelize.define("discoNetworks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  facebook: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  youtube: {
    type: DataTypes.STRING,
  },
  X: {
    type: DataTypes.STRING,
  },
});

export default DiscoNetworks;
