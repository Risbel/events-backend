import { DataTypes } from "sequelize";
import sequelize from "../database/database";
import SuscriptionNotification from "./SubscriptionNotification";

const Subscription: any = sequelize.define("subscription", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

export default Subscription;

Subscription.hasMany(SuscriptionNotification, {
  foreignKey: {
    name: "subscriptionId",
  },
  sourceKey: "id",
});
SuscriptionNotification.belongsTo(Subscription, {
  foreignKey: "subscriptionId",
  targetKey: "id",
});
