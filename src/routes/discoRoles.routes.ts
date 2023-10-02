import { Router } from "express";
import { createDiscoRole, getDiscoRoles } from "../controllers/discoRoles.controllers";

const router = Router();

router.get("/", getDiscoRoles);
router.post(`/:discoId`, createDiscoRole);

export default router;
