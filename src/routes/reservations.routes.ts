import { Router } from "express";
import { createReservation } from "../controllers/reservations.controllers";

const router = Router();

router.post("/", createReservation);

export default router;
