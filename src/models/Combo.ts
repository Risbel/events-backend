import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import ComboReservation from "./ComboReservation";
import ComboDetail from "./ComboDetail";
import TicketCombo from "./TicketCombo";

const Combo = sequelize.define("Combo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  countInStock: {
    type: DataTypes.INTEGER,
  },
  category: {
    type: DataTypes.STRING,
  },
});

Combo.hasMany(TicketCombo, {
  foreignKey: {
    name: "comboId",
  },
  sourceKey: "id",
});
TicketCombo.belongsTo(Combo, {
  foreignKey: "comboId",
  targetKey: "id",
});

//pending to remove
Combo.hasMany(ComboReservation, {
  foreignKey: {
    name: "comboId",
    allowNull: false,
  },
  sourceKey: "id",
});
ComboReservation.belongsTo(Combo, {
  foreignKey: "comboId",
  targetKey: "id",
});
//----------------------------

Combo.hasOne(ComboDetail, {
  foreignKey: {
    name: "comboId",
    allowNull: false,
  },
  sourceKey: "id",
});
ComboDetail.belongsTo(Combo, {
  foreignKey: "comboId",
  targetKey: "id",
});

export default Combo;
