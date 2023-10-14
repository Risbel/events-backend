import { Router } from "express";
const router = Router();

import { signup, login, refreshToken } from "../controllers/auth.controllers";

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;
