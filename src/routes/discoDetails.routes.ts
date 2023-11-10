import { Router } from "express";
import { updateBankCard } from "../controllers/discos.controllers";

const router = Router();

router.put("/:id", updateBankCard);

export default router;
