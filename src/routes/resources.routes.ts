import { Router } from "express";
import { getResources } from "../controllers/resources.controllers";

const router = Router();

router.get("/", getResources);

export default router;
