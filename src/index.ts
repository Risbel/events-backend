import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";
import sequelize from "./database/database";

import "./models/User";
import "./models/Disco";
import "./models/DiscoDetail";
import "./models/QuickLink";
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
import carouselImagesRoutes from "./routes/carouselImages.routes";
import discoBannerImages from "./routes/discoBannerImages.router";
import discoRolesRoutes from "./routes/discoRoles.routes";
import rolesPermissionsResources from "./routes/rolesPermissionsResources";
import permissionsRoutes from "./routes/permissions.routes";
import resourcesRoutes from "./routes/resources.routes";
import aiTextGenerator from "./routes/aiTextGenerator.routes";

import checkout from "./routes/checkout.routes";
import webhookRoutes from "./routes/webhook.routes";

import { createPermissionsResources } from "./utils/createPermissionsResources";

const { originAllowedDev, originAllowedPro }: any = config;

const app = express();
var bodyParser = require("body-parser");

const allowedOrigins = [originAllowedPro, originAllowedDev];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Cookie",
      "Accept",
      "Accept-Language",
      "User-Agent",
      "Referer",
      "Cache-Control",
      "Pragma",
      "Host",
      "Connection",
      "Content-Length",
    ],
  })
);

app.use(cookieParser());
app.use(morgan("dev")); //muestra por consola en modo desarrollo las solicitudes y errores n casos de fallos

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));
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
app.use("/api/carouselImages", carouselImagesRoutes);
app.use("/api/discoBannerImage", discoBannerImages);
app.use("/api/discoRoles", discoRolesRoutes);
app.use("/api/rolesPermissionsResources", rolesPermissionsResources);
app.use("/api/permission", permissionsRoutes);
app.use("/api/resource", resourcesRoutes);
app.use("/api/aiText", aiTextGenerator);

app.use("/api/stripe", checkout);
app.use("/api/webhook", webhookRoutes);

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await sequelize.sync({ alter: true, logging: false });

    await createPermissionsResources();

    app.listen(PORT, () => {
      console.log("server on port", PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
