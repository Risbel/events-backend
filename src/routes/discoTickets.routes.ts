import { Router } from "express";
const router = Router();

import {
  getTickets,
  getTicketsByIdDisco,
  createDiscoTicket,
  updateDiscoTicket,
  deleteDiscoTicket,
  getTicketById,
} from "../controllers/discoTickets.controllers";

router.get("/", getTickets);
router.get("/disco/:id", getTicketsByIdDisco);
router.get("/:id", getTicketById);
router.post("/:id", createDiscoTicket);
router.put("/:id", updateDiscoTicket);
router.delete("/:id", deleteDiscoTicket);

export default router;
