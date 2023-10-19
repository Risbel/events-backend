import { DataTypes } from "sequelize";
import sequelize from "../database/database";

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

export default TicketsReservation;
