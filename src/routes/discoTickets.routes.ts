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
import upload from "../utils/multer";
/**
 * @openapi
 * /api/discoTicket/:
 *   get:
 *     summary: Get all tickets
 *     tags: [Event Tickets]
 *     responses:
 *       200:
 *         description: List of all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   price:
 *                     type: number
 *                   shortDescription:
 *                     type: string
 *                   largeDescription:
 *                     type: string
 *                   category:
 *                     type: string
 *                   countInStock:
 *                     type: integer
 *                   expDate:
 *                     type: string
 *                     format: date-time
 *                   discoId:
 *                     type: string
 *                   Disco:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/", getTickets); //ok

/**
 * @openapi
 * /api/discoTicket/disco/{id}:
 *   get:
 *     summary: Get tickets by disco ID
 *     tags: [Event Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *     responses:
 *       200:
 *         description: Tickets by disco ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   price:
 *                     type: number
 *                   shortDescription:
 *                     type: string
 *                   category:
 *                     type: string
 *                   countInStock:
 *                     type: integer
 *                   discoId:
 *                     type: string
 *                   TicketsReservation:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                   TicketCombo:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         Combo:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/disco/:id", getTicketsByIdDisco); //ok

/**
 * @openapi
 * /api/discoTicket/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Event Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 price:
 *                   type: number
 *                 shortDescription:
 *                   type: string
 *                 largeDescription:
 *                   type: string
 *                 category:
 *                   type: string
 *                 countInStock:
 *                   type: integer
 *                 expDate:
 *                   type: string
 *                   format: date-time
 *                 discoId:
 *                   type: string
 *                 Disco:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     DiscoDetail:
 *                       type: object
 *                       properties:
 *                         address:
 *                           type: string
 *                         bannerDescription:
 *                           type: string
 *                         DiscoBankCard:
 *                           type: object
 *                           properties:
 *                             cardNumber:
 *                               type: string
 *                             bankName:
 *                               type: string
 *                 TicketImages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       image:
 *                         type: string
 *                       imageText:
 *                         type: string
 *                 TicketCombo:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       Combo:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           ComboDetail:
 *                             type: object
 *                             properties:
 *                               description:
 *                                 type: string
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:id", getTicketById); //ok

/**
 * @openapi
 * /api/discoTicket/{id}:
 *   post:
 *     summary: Create a new disco ticket
 *     tags: [Event Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     price:
 *                       type: number
 *                     shortDescription:
 *                       type: string
 *                     largeDescription:
 *                       type: string
 *                     category:
 *                       type: string
 *                     countInStock:
 *                       type: integer
 *                     expDate:
 *                       type: string
 *                       format: date-time
 *                     discoId:
 *                       type: string
 *                 image:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     imageText:
 *                       type: string
 *                     image:
 *                       type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/:id", upload.single("image"), createDiscoTicket); //ok

/**
 * @openapi
 * /api/discoTicket/{id}:
 *   put:
 *     summary: Update a disco ticket by ID
 *     tags: [Event Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *               shortDescription:
 *                 type: string
 *               countInStock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 price:
 *                   type: number
 *                 shortDescription:
 *                   type: string
 *                 countInStock:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/:id", updateDiscoTicket); //ok

/**
 * @openapi
 * /api/discoTicket/{id}:
 *   delete:
 *     summary: Delete a disco ticket by ID
 *     tags: [Event Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     responses:
 *       204:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/:id", deleteDiscoTicket); //ok

export default router;
