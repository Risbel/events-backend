import { Router } from "express";
import { checkout } from "../controllers/stripe.controllers";

const router = Router();

router.post("/checkout/:userId", checkout);

export default router;
