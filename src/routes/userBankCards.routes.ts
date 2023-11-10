import { Router } from "express";
const router = Router();

import { createBankCard, deleteUserBankCard, getBankCardsByUserId } from "../controllers/userBankCards.controllers";

router.post("/", createBankCard);
router.get("/:userId", getBankCardsByUserId);
router.delete("/:id", deleteUserBankCard);

export default router;
