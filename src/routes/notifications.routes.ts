import { Router } from "express";
import {
  createEventNotification,
  deleteNotification,
  editNotification,
  getNotificationsByEventId,
} from "../controllers/notifications.controllers";
import upload from "../utils/multer";

const router = Router();

router.get(`/:eventId`, getNotificationsByEventId);
router.post(`/:eventId`, upload.single("image"), createEventNotification);
router.delete("/:id", deleteNotification);
router.put("/:id", editNotification);

export default router;
