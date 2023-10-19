import { Router } from "express";
const router = Router();

import {
  getTickets,
  getTicketsByIdDisco,
  createDiscoTicket,
  updateDiscoTicket,
  deleteDiscoTicket,
} from "../controllers/discoTickets.controllers";

router.get("/", getTickets);
router.get("/:id", getTicketsByIdDisco);
router.post("/:id", createDiscoTicket);
router.put("/:id", updateDiscoTicket);
router.delete("/:id", deleteDiscoTicket);

export default router;
