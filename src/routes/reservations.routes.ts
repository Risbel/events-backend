import { Router } from "express";
import {
  createReservation,
  getReservationCombosById,
  getReservationsByDiscoSlug,
  getReservationsByUserId,
} from "../controllers/reservations.controllers";

const router = Router();

router.post("/", createReservation);
router.get("/:userId", getReservationsByUserId);
router.get("/:slug/reservBySlug", getReservationsByDiscoSlug);
router.get("/combos/:id", getReservationCombosById);

export default router;
