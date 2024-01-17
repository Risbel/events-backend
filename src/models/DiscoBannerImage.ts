import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const DiscoBannerImage = sequelize.define("discoBannerImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  alt: {
    type: DataTypes.STRING,
  },
});

export default DiscoBannerImage;
