import { Router } from "express";
const router = Router();

import {
  createDisco,
  getDisco,
  getDiscos,
  updateDisco,
  deleteDisco,
  getRolesByIdDisco,
  getMyEvents,
} from "../controllers/discos.controllers";
import { verifyToken } from "../middlewares/authorization";
import upload from "../utils/multer";

/**
 * @openapi
 * /api/disco/:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   DiscoDetail:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       bannerDescription:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get("/", getDiscos); //ok

/**
 * @openapi
 * /api/disco/roles/{id}:
 *   get:
 *     summary: Get roles by disco ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *     responses:
 *       200:
 *         description: Roles by disco ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 logo:
 *                   type: string
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 DiscoRoles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       discoId:
 *                         type: string
 *       404:
 *         description: Disco not found
 *       500:
 *         description: Internal server error
 */
router.get("/roles/:id", getRolesByIdDisco); //ok

/**
 * @openapi
 * /api/disco/myEvents/{userId}:
 *   get:
 *     summary: Get my events by user ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: My events by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   logo:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   DiscoDetail:
 *                     type: object
 *                     properties:
 *                       administrator:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       largeDescription:
 *                         type: string
 *                       bgImage:
 *                         type: string
 *                       address:
 *                         type: string
 *                       phone:
 *                         type: string
 *       404:
 *         description: You haven't Events
 *       500:
 *         description: Internal server error
 */
router.get("/myEvents/:userId", getMyEvents); //ok

/**
 * @openapi
 * /api/disco/{slug}/{userId?}:
 *   get:
 *     summary: Get a disco by slug and optional user ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco slug
 *       - in: path
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A disco
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 disco:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                     DiscoDetail:
 *                       type: object
 *                       properties:
 *                         h1Banner:
 *                           type: string
 *                         administrator:
 *                           type: string
 *                         bannerDescription:
 *                           type: string
 *                         titleTextAbout:
 *                           type: string
 *                         layoutTextAbout:
 *                           type: string
 *                         titleTextCarousel:
 *                           type: string
 *                         address:
 *                           type: string
 *                         DiscoNetworks:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               facebook:
 *                                 type: string
 *                               instagram:
 *                                 type: string
 *                               youtube:
 *                                 type: string
 *                               X:
 *                                 type: string
 *                         QuickLink:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                         DiscoImage:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               imageUrl:
 *                                 type: string
 *                         DiscoPhone:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               number:
 *                                 type: string
 *                         DiscoEmail:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               email:
 *                                 type: string
 *                         DiscoColor:
 *                           type: object
 *                           properties:
 *                             bgTicketsSection:
 *                               type: string
 *                             ticketH1Color:
 *                               type: string
 *                             buttonsTicketsColor:
 *                               type: string
 *                             buttonTicketForeground:
 *                               type: string
 *                             bgExperiencies:
 *                               type: string
 *                             experienciesH1Color:
 *                               type: string
 *                             h1BannerColor:
 *                               type: string
 *                             bannerDescriptionColor:
 *                               type: string
 *                             bannerGradientColor:
 *                               type: string
 *                             brandColor:
 *                               type: string
 *                             bgNavbarColor:
 *                               type: string
 *                             navbarForeground:
 *                               type: string
 *                             buttonColor:
 *                               type: string
 *                             buttonForeground:
 *                               type: string
 *                             titleAboutColor:
 *                               type: string
 *                             bgAboutColor:
 *                               type: string
 *                             bgFooterColor:
 *                               type: string
 *                             foregroundFooterColor:
 *                               type: string
 *                         EventAbout:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               aboutText:
 *                                 type: string
 *                 subscription:
 *                   type: object
 *                   properties:
 *                     discoId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     roleId:
 *                       type: string
 *       404:
 *         description: The disco does not exist
 *       500:
 *         description: Internal server error
 */
router.get("/:slug/:userId?", getDisco); //ok

/**
 * @openapi
 * /api/disco/:
 *   post:
 *     summary: Create a new Events
 *     tags:
 *       - Events
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Art Experience
 *               slug:
 *                 type: string
 *                 example: art-experience
 *               brandColor:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               bgNavbarColor:
 *                 type: string
 *               navbarForeground:
 *                 type: string
 *               h1Banner:
 *                 type: string
 *               h1BannerColor:
 *                 type: string
 *               bannerGradientColor:
 *                 type: string
 *               bannerDescription:
 *                 type: string
 *               bannerDescriptionColor:
 *                 type: string
 *               titleAboutColor:
 *                 type: string
 *               titleTextAbout:
 *                 type: string
 *               bgAboutColor:
 *                 type: string
 *               layoutTextAbout:
 *                 type: string
 *               aboutTexts:
 *                 type: string
 *               buttonColor:
 *                 type: string
 *               buttonForeground:
 *                 type: string
 *               titleTextCarousel:
 *                 type: string
 *               bgExperiencies:
 *                 type: string
 *               experienciesH1Color:
 *                 type: string
 *               bgTicketsSection:
 *                 type: string
 *               ticketH1Color:
 *                 type: string
 *               buttonsTicketsColor:
 *                 type: string
 *               buttonTicketForeground:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               socials:
 *                 type: string
 *               quickLinks:
 *                 type: string
 *               bgFooterColor:
 *                 type: string
 *               foregroundFooterColor:
 *                 type: string
 *               administrator:
 *                 type: string
 *               bannerImage:
 *                 type: file
 *               logo:
 *                 type: file
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal server error
 */
router.post("/", upload.any(), createDisco); //ok

/**
 * @openapi
 * /api/disco/{id}:
 *   put:
 *     summary: Update a disco by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               administrator:
 *                 type: string
 *               description:
 *                 type: string
 *               largeDescription:
 *                 type: string
 *               bgImage:
 *                 type: string
 *               address:
 *                 type: string
 *               slug:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 disco:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     logo:
 *                       type: string
 *                 details:
 *                   type: object
 *                   properties:
 *                     slug:
 *                       type: string
 *                     administrator:
 *                       type: string
 *                     description:
 *                       type: string
 *                     largeDescription:
 *                       type: string
 *                     bgImage:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateDisco); //ok

/**
 * @openapi
 * /api/disco/{id}:
 *   delete:
 *     summary: Delete a disco by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The disco ID
 *     responses:
 *       200:
 *         description: Disco deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Disco not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteDisco); //ok

export default router;
