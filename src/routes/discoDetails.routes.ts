import { Router } from "express";
import { updateBankCard } from "../controllers/discos.controllers";

const router = Router();

router.put("/:userBankCardId", updateBankCard);

export default router;
