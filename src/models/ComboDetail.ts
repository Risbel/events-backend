import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const ComboDetail = sequelize.define("comboDetail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  imageCloudId: {
    type: DataTypes.STRING,
  },
});

export default ComboDetail;
