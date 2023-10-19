import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import TicketsReservation from "./TicketsReservation";

const DiscoTicket = sequelize.define("DiscoTicket", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

export default DiscoTicket;

DiscoTicket.hasMany(TicketsReservation, {
  foreignKey: {
    name: "discoTicketId",
    allowNull: false,
  },
  sourceKey: "id",
});
TicketsReservation.belongsTo(DiscoTicket, {
  foreignKey: "discoTicketId",
  targetKey: "id",
});
