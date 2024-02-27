import { Router } from "express";
const router = Router();

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserReservations,
  getUserByToken,
  getMyUsers,
} from "../controllers/users.controllers";

router.get("/", getUsers);
router.get("/token", getUserByToken);
router.get("/:id", getUser);
router.get("/:id/reservations", getUserReservations);
router.get("/myUsers/:userId", getMyUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
