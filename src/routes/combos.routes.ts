import { Router } from "express";
import { createCombo, getComboByDiscoId, getCombos } from "../controllers/combos.controllers";
import upload from "../utils/multer";

const router = Router();

router.get("/", getCombos);
router.get("/:discoId", getComboByDiscoId);
router.post("/:discoId", upload.single("image"), createCombo);

export default router;
