import { Router } from "express";
import {
  asociateCombo,
  createCombo,
  deleteCombo,
  getComboByDiscoId,
  getCombos,
  updateCombo,
} from "../controllers/combos.controllers";
import upload from "../utils/multer";

const router = Router();

router.get("/", getCombos);
router.get("/:discoId", getComboByDiscoId);
router.post("/asociate/:discoTicketId", asociateCombo);
router.post("/:discoId", upload.single("image"), createCombo);
router.put("/:id", updateCombo);
router.delete("/:id", deleteCombo);

export default router;
