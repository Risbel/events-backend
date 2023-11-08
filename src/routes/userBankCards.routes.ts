import { Router } from "express";
const router = Router();

import { getBankCardsByUserId } from "../controllers/userBankCards.controllers";

router.get("/:userId", getBankCardsByUserId);

export default router;
