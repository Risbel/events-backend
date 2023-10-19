import { Router } from "express";
import { createDiscoRole, getDiscoRoleBySlug, getDiscoRoles } from "../controllers/discoRoles.controllers";

const router = Router();

router.get("/", getDiscoRoles);
router.get("/:slug", getDiscoRoleBySlug);
router.post(`/:discoId`, createDiscoRole);

export default router;
