import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoDetail from "./DiscoDetail";
import DiscoTicket from "./DiscoTicket";
import Subscription from "./Subscription";
import Combo from "./Combo";
import DiscoRole from "./DiscoRole";
import Reservation from "./Reservation";
import EventNotification from "./EventNotification";

const Disco = sequelize.define("Disco", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  logo: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
});

Disco.hasOne(DiscoDetail, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
DiscoDetail.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(DiscoTicket, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
DiscoTicket.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(Subscription, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
Subscription.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(Combo, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
Combo.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(DiscoRole, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
DiscoRole.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(Reservation, {
  foreignKey: {
    name: "discoId",
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
Reservation.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

Disco.hasMany(EventNotification, {
  foreignKey: {
    name: "discoId",
  },
  sourceKey: "id",
  onDelete: "CASCADE",
});
EventNotification.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
  onDelete: "CASCADE",
});

export default Disco;
