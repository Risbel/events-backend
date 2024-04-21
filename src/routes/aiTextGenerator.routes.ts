import { Router } from "express";
import { colorGenerator } from "../controllers/aiTextGenerator.controllers";

const router = Router();

router.post("/colorGenerator", colorGenerator);

export default router;
