import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import DiscoDetail from "./DiscoDetail";
import DiscoTicket from "./DiscoTicket";
import Subscription from "./Subscription";
import Combo from "./Combo";
import DiscoRole from "./DiscoRole";
import Reservation from "./Reservation";

const Disco = sequelize.define("Disco", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
  },
});

Disco.hasOne(DiscoDetail, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
});
DiscoDetail.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

Disco.hasMany(DiscoTicket, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
});
DiscoTicket.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

Disco.hasMany(Subscription, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
});
Subscription.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

Disco.hasMany(Combo, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
});
Combo.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

Disco.hasMany(DiscoRole, {
  foreignKey: {
    name: "discoId",
    allowNull: false,
  },
  sourceKey: "id",
});
DiscoRole.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

Disco.hasMany(Reservation, {
  foreignKey: {
    name: "discoId",
  },
  sourceKey: "id",
});
Reservation.belongsTo(Disco, {
  foreignKey: "discoId",
  targetKey: "id",
});

export default Disco;
