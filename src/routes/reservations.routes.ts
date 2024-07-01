import { Router } from "express";
import {
  createReservation,
  getReservationCombosById,
  getReservationsByDiscoSlug,
  getReservationsByUserId,
} from "../controllers/reservations.controllers";

const router = Router();

/**
 * @openapi
 * /api/reservation/:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     description: Creates a new reservation for the user identified by `userId` in the request body. The request body can include Disco Tickets (`discoId`), Ticket Reservations (`discoTicketId`), or Combos (`comboId`).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user creating the reservation.
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     discoId:
 *                       type: integer
 *                       description: (Optional) The ID of the Disco Ticket to include in the reservation.
 *                     discoTicketId:
 *                       type: integer
 *                       description: (Optional) The ID of the Ticket Reservation to include in the reservation.
 *                     comboId:
 *                       type: integer
 *                       description: (Optional) The ID of the Combo to include in the reservation.
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the item being reserved (Disco Ticket or Combo).
 *                     collaborator:
 *                       type: string
 *                       description: (Optional) Collaborator information for the reservation (specific format depends on the implementation).
 *                     expDate:
 *                       type: string
 *                       description: (Optional) The expiration date for the reservation (specific format depends on the implementation).
 *     responses:
 *       '200':
 *         description: Reservation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating reservation creation.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the internal server error.
 */
router.post("/", createReservation);
/**
 * @openapi
 * /api/reservation/{userId}:
 *   get:
 *     summary: Get reservations for a user
 *     tags: [Reservations]
 *     description: Retrieves all reservations for the user identified by `userId` in the path parameter.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the user to get reservations for.
 *     responses:
 *       '200':
 *         description: Reservations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the reservation.
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user associated with the reservation.
 *                   TicketsReservations:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         DiscoTicket:
 *                           type: object
 *                           properties:
 *                             Disco:
 *                               type: object
 *                               properties:
 *                         TicketReservationCombo:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                             Combo:
 *                               type: object
 *                               properties:
 *                                 Disco:
 *                                   type: object
 *                                   properties:
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the internal server error.
 */
router.get("/:userId", getReservationsByUserId);
/**
 * @openapi
 * /api/reservations/{slug}/reservBySlug:
 *   get:
 *     summary: Get reservations for a disco by slug with filtering
 *     tags: [Reservations]
 *     description: Retrieves reservations for the disco identified by `slug` in the path parameter. Optionally filters reservations based on their expiration date using the `cursor` query parameter. Valid values for `cursor` are "today" (reservations expiring today), "yesterday" (reservations expired yesterday), "pending" (reservations not yet expired), and "expired" (reservations already expired).
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: The slug of the disco to get reservations for.
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *           description: The maximum number of reservations to return (optional, defaults to 10).
 *       - name: cursor
 *         in: query
 *         schema:
 *           type: string
 *           enum:
 *             - today
 *             - yesterday
 *             - pending
 *             - expired
 *           description: Filter reservations based on their expiration date (optional).
 *     responses:
 *       '200':
 *         description: Reservations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user associated with the reservation.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time the reservation was created.
 *                   id:
 *                     type: integer
 *                     description: The ID of the reservation.
 *                   expDate:
 *                     type: string
 *                     format: date
 *                     description: The expiration date of the reservation.
 *                   User:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                       phone:
 *                         type: string
 *                         description: The user's phone number.
 *                       email:
 *                         type: string
 *                         description: The user's email address.
 *                       lastName:
 *                         type: string
 *                         description: The user's last name.
 *                   TicketsReservations:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the ticket reservation.
 *                         quantity:
 *                           type: integer
 *                           description: The quantity of tickets reserved.
 *                         discoTicketId:
 *                           type: integer
 *                           description: The ID of the associated disco ticket.
 *                         DiscoTicket:
 *                           type: object
 *                           properties:
 *                             price:
 *                               type: number
 *                               description: The price of the disco ticket.
 *                             expDate:
 *                               type: string
 *                               format: date
 *                               description: The expiration date of the disco ticket.
 *                             shortDescription:
 *                               type: string
 *                               description: A short description of the disco ticket.
 *                             id:
 *                               type: integer
 *                               description: The ID of the disco ticket.
 *                             category:
 *                               type: string
 *                               description: The category of the disco ticket.
 *       '404':
 *         description: Disco not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the disco was not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the internal server error.
 */
router.get("/:slug/reservBySlug", getReservationsByDiscoSlug);
/**
 * @openapi
 * /api/reservations/combos/{id}:
 *   get:
 *     summary: Get reservation combos by reservation ID
 *     tags: [Reservations]
 *     description: Retrieves all Combo reservations associated with a specific reservation identified by `id` in the path parameter.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the reservation to get combo reservations for.
 *     responses:
 *       '200':
 *         description: Reservation combos retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the ticket reservation combo.
 *                   ticketReservationId:
 *                     type: integer
 *                     description: The ID of the associated ticket reservation.
 *                   # Other TicketReservationCombo properties (dependent on your implementation)
 *                   # ...
 *                   Combo:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the combo.
 *                       # Other Combo properties (dependent on your implementation)
 *                       # ...
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the internal server error.
 */
router.get("/combos/:id", getReservationCombosById);

export default router;
