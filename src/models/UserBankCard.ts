import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const UserBankCard = sequelize.define("userBankCard", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.STRING,
  },
});

export default UserBankCard;
