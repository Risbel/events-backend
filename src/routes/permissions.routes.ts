import { Router } from "express";
import { getPermissions } from "../controllers/permissions.controllers";

const router = Router();

router.get("/", getPermissions);

export default router;
