import { Router } from "express";
import { createResource, getResources } from "../controllers/resources.controllers";

const router = Router();

router.get("/", getResources);
router.post("/", createResource);

export default router;
