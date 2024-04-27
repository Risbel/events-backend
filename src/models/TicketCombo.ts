import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const TicketCombo = sequelize.define("ticketCombo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default TicketCombo;
