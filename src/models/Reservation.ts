import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import TicketsReservation from "./TicketsReservation";
import ComboReservation from "./ComboReservation";

const Reservation = sequelize.define("reservation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  collaborator: {
    type: DataTypes.STRING,
  },
  expDate: {
    type: DataTypes.DATE,
  },
});

export default Reservation;

Reservation.hasMany(TicketsReservation, {
  foreignKey: {
    name: "reservationId",
    allowNull: false,
  },
  sourceKey: "id",
});
TicketsReservation.belongsTo(Reservation, {
  foreignKey: "reservationId",
  targetKey: "id",
});

Reservation.hasMany(ComboReservation, {
  foreignKey: {
    name: "reservationId",
    allowNull: false,
  },
  sourceKey: "id",
});
ComboReservation.belongsTo(Reservation, {
  foreignKey: "reservationId",
  targetKey: "id",
});
