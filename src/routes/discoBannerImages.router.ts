import { Router } from "express";
import {
  createBannerImages,
  deleteBannerImage,
  getBannerImageById,
  getBannerImages,
} from "../controllers/discoBannerImages";
import upload from "../utils/multer";

const router = Router();

/**
 * @swagger
 * /api/discoBannerImage/:
 *   get:
 *     summary: Retrieves a list of Disco Banner Images (alternative)
 *     tags: [EvenBannerImages]
 *     description: An alternative endpoint for retrieving a list of Disco Banner Images.
 *     responses:
 *       200:
 *         description: Successful retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscoBannerImage'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
router.get("/", getBannerImages);
/**
 * @swagger
 * /api/discoBannerImage/{discoDetailId}/:
 *   get:
 *     summary: Retrieves a Disco Banner Image by ID
 *     tags: [EvenBannerImages]
 *     description: Returns a single Disco Banner Image object matching the provided ID.
 *     parameters:
 *       - in: path
 *         name: discoDetailId
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the Disco Banner Image to retrieve.
 *     responses:
 *       200:
 *         description: Successful retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscoBannerImage'
 *       404:
 *         description: Disco Banner Image not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
router.get("/:discoDetailId", getBannerImageById);
/**
 * @swagger
 * /api/discoBannerImage/:
 *   post:
 *     summary: Creates new Disco Banner Images
 *     tags: [EvenBannerImages]
 *     description: This endpoint allows you to upload and create new Disco Banner Image objects. Provide the necessary data in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               discoDetailsId:
 *                 type: string
 *                 description: The ID of the Disco Detail for which you're creating the new Banner Images.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array containing the Disco Banner Image files you want to upload (multiple files allowed). Ensure the format is valid for image uploads.
 *     responses:
 *       200:
 *         description: Successful creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscoBannerImage'
 *       400:
 *         description: Bad request encountered during processing. This could be due to missing data, invalid format, or other issues with the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue encountered.
 */
router.post("/", upload.any(), createBannerImages);
/**
 * @swagger
 * /api/discoBannerImage/{id}:
 *   delete:
 *     summary: Deletes a Disco Banner Image
 *     tags: [EvenBannerImages]
 *     description: This endpoint allows you to delete a specific Disco Banner Image object identified by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the Disco Banner Image you want to delete.
 *     responses:
 *       204:
 *         description: Successful deletion. No content is returned in the response body.
 *       404:
 *         description: Disco Banner Image with the provided ID was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the image was not found.
 *       500:
 *         description: Internal server error occurred during processing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message describing the issue encountered.
 */
router.delete("/:id", deleteBannerImage);

export default router;
