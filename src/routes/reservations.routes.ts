import { Router } from "express";
import {
  createReservation,
  getReservationsByDiscoSlug,
  getReservationsByUserId,
} from "../controllers/reservations.controllers";

const router = Router();

router.post("/", createReservation);
router.get("/:userId", getReservationsByUserId);
router.get("/:slug/reservBySlug", getReservationsByDiscoSlug);

export default router;
