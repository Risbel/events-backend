import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./database/database";

import "./models/User";
import "./models/Disco";
import "./models/DiscoDetail";
import "./models/DiscoTicket";
import "./models/Combo";
import "./models/ComboDetail";
import "./models/Subscription";
import "./models/Reservation";
import "./models/TicketsReservation";
import "./models/ComboReservation";
import "./models/DiscoRole";
import "./models/Permission";
import "./models/Resource";
import "./models/rolePermissionResouce";
import "./models/DiscoNetworks";
import "./models/DiscoImage";

import usersRoutes from "./routes/users.routes";
import userBankCardRoutes from "./routes/userBankCards.routes";
import authRoutes from "./routes/auth.routes";
import discoRoutes from "./routes/discos.routes";
import discoDetailsRoutes from "./routes/discoDetails.routes";
import discoTicketsRoutes from "./routes/discoTickets.routes";
import comboRoutes from "./routes/combos.routes";
import reservationRoutes from "./routes/reservations.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import discoImagesRoutes from "./routes/discoImages.routes";
import discoRolesRoutes from "./routes/discoRoles.routes";
import rolesPermissionsResources from "./routes/rolesPermissionsResources";
import permissionsRoutes from "./routes/permissions.routes";
import resourcesRoutes from "./routes/resources.routes";

import config from "./config";
import { createSuperAdmin } from "./utils/createSuperAdmin";

const { originAllowedDev, originAllowedPro }: any = config;

const app = express();
var bodyParser = require("body-parser");

app.use(
  cors({
    origin: [originAllowedPro, originAllowedDev],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev")); //muestra por consola en modo desarrollo las solicitudes y errores n casos de fallos

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", usersRoutes);
app.use("/api/userBankCard", userBankCardRoutes);
app.use("/api/disco", discoRoutes);
app.use("/api/discoDetail", discoDetailsRoutes);
app.use("/api/discoTicket", discoTicketsRoutes);
app.use("/api/combo", comboRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api", authRoutes);
app.use("/api/subscription", subscriptionsRoutes);
app.use("/api/discoImage", discoImagesRoutes);
app.use("/api/discoRoles", discoRolesRoutes);
app.use("/api/rolesPermissionsResources", rolesPermissionsResources);
app.use("/api/permission", permissionsRoutes);
app.use("/api/resource", resourcesRoutes);

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await sequelize.sync({ alter: true, logging: false });

    await createSuperAdmin();
    app.listen(PORT, () => {
      console.log("server on port", PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
