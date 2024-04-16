import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import Companion from "./Companions";

const TicketsReservation = sequelize.define("ticketsReservation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

TicketsReservation.hasMany(Companion, {
  foreignKey: "ticketReservationId",
  sourceKey: "id",
});

Companion.belongsTo(TicketsReservation, {
  foreignKey: "ticketReservationId",
  targetKey: "id",
});

export default TicketsReservation;
