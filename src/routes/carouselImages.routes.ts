import { Router } from "express";
import { getImages, createCarouselImages, deleteDiscoImage } from "../controllers/carouselImages.controllers";
import upload from "../utils/multer";

const router = Router();

/**
 * @swagger
 * /api/carouselImages:
 *   get:
 *     summary: Get all carousel images
 *     description: Retrieves all carousel images from the database.
 *     tags:
 *       - Carousel Images
 *     responses:
 *       200:
 *         description: List of carousel images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of carousel image objects
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the carousel image
 *                   image:
 *                     type: string
 *                     description: The URL of the carousel image
 *                   discoDetailsId:
 *                     type: integer
 *                     description: The ID of the disco details this image belongs to
 */
router.get("/", getImages);
/**
 * @swagger
 * /api/carouselImages:
 *   post:
 *     summary: Create new carousel images
 *     description: Uploads multiple images and creates new carousel image entries in the database.
 *     tags:
 *       - Carousel Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               discoDetailsId:
 *                 type: integer
 *                 description: The ID of the disco details this image belongs to.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of image files to upload.
 *     responses:
 *       200:
 *         description: OK. An array of newly created carousel image objects is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array of carousel image objects
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the carousel image
 *                   image:
 *                     type: string
 *                     description: The URL of the carousel image
 *                   discoDetailsId:
 *                     type: integer
 *                     description: The ID of the disco details this image belongs to
 *       400:
 *         description: Bad Request. The request may be invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue.
 *       500:
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the problem.
 */
router.post("/", upload.any(), createCarouselImages);
/**
 * @swagger
 * /api/carouselImages/{id}:
 *   delete:
 *     summary: Delete a carousel image
 *     description: Deletes a specific carousel image by its ID.
 *     tags:
 *       - Carousel Images
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the carousel image to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No Content. The carousel image was successfully deleted.
 *       400:
 *         description: Bad Request. The request may be invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue.
 *       500:
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the problem.
 */
router.delete("/:id", deleteDiscoImage);

export default router;
