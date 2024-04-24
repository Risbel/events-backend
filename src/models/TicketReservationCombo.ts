import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const TicketReservationCombo = sequelize.define("ticketReservationCombo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

export default TicketReservationCombo;
