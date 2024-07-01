import { Router } from "express";
import {
  asociateCombo,
  createCombo,
  deleteCombo,
  getComboByDiscoId,
  getCombos,
  updateCombo,
} from "../controllers/combos.controllers";
import upload from "../utils/multer";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all combos
 *     tags: [Combos]
 *     responses:
 *       200:
 *         description: List of all combos
 */
router.get("/", getCombos);

/**
 * @swagger
 * /{discoId}:
 *   get:
 *     summary: Get combos by disco ID
 *     tags: [Combos]
 *     parameters:
 *       - in: path
 *         name: discoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *     responses:
 *       200:
 *         description: Combos by disco ID
 */
router.get("/:discoId", getComboByDiscoId);

/**
 * @swagger
 * /asociate/{discoTicketId}:
 *   post:
 *     summary: Associate combo with disco ticket
 *     tags: [Combos]
 *     parameters:
 *       - in: path
 *         name: discoTicketId
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ticket ID
 *     responses:
 *       201:
 *         description: Associated
 */
router.post("/asociate/:discoTicketId", asociateCombo);

/**
 * @swagger
 * /{discoId}:
 *   post:
 *     summary: Create a new combo for a disco
 *     tags: [Combos]
 *     parameters:
 *       - in: path
 *         name: discoId
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
 */
router.post("/:discoId", upload.single("image"), createCombo);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a combo by ID
 *     tags: [Combos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The combo ID
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", updateCombo);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a combo by ID
 *     tags: [Combos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The combo ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", deleteCombo);

export default router;
