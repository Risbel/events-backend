import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoDetail from "./DiscoDetail";

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

UserBankCard.hasOne(DiscoDetail, {
  foreignKey: { name: "userBankCardId", allowNull: true },
  sourceKey: "id",
});

DiscoDetail.belongsTo(UserBankCard, {
  foreignKey: { name: "userBankCardId" },
  targetKey: "id",
});

export default UserBankCard;
