import { Router } from "express";
import { createDiscoRole, getDiscoRoleBySlug, getDiscoRoles } from "../controllers/discoRoles.controllers";

const router = Router();

/**
 * @openapi
 * /api/discoRoles/:
 *   get:
 *     summary: Retrieves a list of Disco Roles
 *     tags: [EventRoles]
 *     description: Returns a JSON array of all Disco Roles.
 *     responses:
 *       200:
 *         description: Successful retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The Disco Role ID.
 *                   name:
 *                     type: string
 *                     description: The Disco Role name.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Creation date and time.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last update date and time.
 *                   Disco:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The Disco ID.
 *                       name:
 *                         type: string
 *                         description: The Disco name.
 *                   rolePermissionsResouces:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: rolePermissionsResouces ID.
 *                         roleId:
 *                           type: integer
 *                           description: Disco Role ID associated with this record.
 *                         permissionId:
 *                           type: integer
 *                           description: Permission ID associated with this record.
 *                         resourceId:
 *                           type: integer
 *                           description: Resource ID associated with this record.
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
router.get("/", getDiscoRoles);
/**
 * @openapi
 * /api/discoRoles/{slug}:
 *   get:
 *     summary: Retrieves a Disco Role by its slug
 *     tags: [EventRoles]
 *     description: Use this endpoint to retrieve a specific Disco Role object based on its unique slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           description: The slug of the Disco Role you want to retrieve.
 *     responses:
 *       200:
 *         description: Successful retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the Disco Role.
 *                 name:
 *                   type: string
 *                   description: The name of the Disco Role.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the Disco Role was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the Disco Role was last updated.
 *                 Disco:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the Disco this role belongs to.
 *                     name:
 *                       type: string
 *                       description: The name of the Disco.
 *                 rolePermissionsResouces:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the rolePermissionsResouces record.
 *                       roleId:
 *                         type: integer
 *                         description: The ID of the Disco Role associated with this record.
 *                       permissionId:
 *                         type: integer
 *                         description: The ID of the Permission associated with this record.
 *                       resourceId:
 *                         type: integer
 *                         description: The ID of the Resource associated with this record.
 *       404:
 *         description: Disco Role with the provided slug was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating the role was not found.
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
router.get("/:slug", getDiscoRoleBySlug);
/**
 * @openapi
 * /api/discoRoles/{discoId}:
 *   post:
 *     summary: Creates a new Disco Role
 *     tags: [EventRoles]
 *     description: This endpoint allows you to create a new Disco Role object.
 *     parameters:
 *       - in: path
 *         name: discoId
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the Disco the new role belongs to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new Disco Role you want to create.
 *     responses:
 *       200:
 *         description: Successful creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique ID of the newly created Disco Role (assuming the controller assigns an ID).
 *                 name:
 *                   type: string
 *                   description: The name of the created Disco Role.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the Disco Role was created (assuming the controller sets this value).
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the Disco Role was last updated (assuming the controller sets this value).
 *                 discoId:
 *                   type: integer
 *                   description: The ID of the Disco the new role belongs to (matches the provided path parameter).
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
router.post(`/:discoId`, createDiscoRole);

export default router;
