import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import TicketsReservation from "./TicketsReservation";
import TicketImages from "./TicketImages";
import TicketCombo from "./TicketCombo";

const DiscoTicket = sequelize.define("DiscoTicket", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  shortDescription: {
    type: DataTypes.STRING,
  },
  largeDescription: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  countInStock: {
    type: DataTypes.INTEGER,
  },
  expDate: {
    type: DataTypes.DATE,
  },
});

export default DiscoTicket;

DiscoTicket.hasMany(TicketCombo, {
  foreignKey: {
    name: "discoTicketId",
  },
  sourceKey: "id",
});
TicketCombo.belongsTo(DiscoTicket, {
  foreignKey: "discoTicketId",
  targetKey: "id",
});

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

DiscoTicket.hasMany(TicketImages, {
  foreignKey: "discoTicketId",
  sourceKey: "id",
});

TicketImages.belongsTo(DiscoTicket, {
  foreignKey: "discoTicketId",
  targetKey: "id",
});
