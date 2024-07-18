import { Router } from "express";
import {
  createEventNotification,
  deleteNotification,
  editNotification,
  getNotificationsByEventId,
  getNotificationsBySubscription,
  getNotificationsByUserEvent,
  updateNotificationIsDeleted,
  updateNotificationIsRead,
} from "../controllers/notifications.controllers";
import upload from "../utils/multer";

const router = Router();

router.get("/:eventId", getNotificationsByEventId);
router.get("/subscription/:userId", getNotificationsBySubscription);
router.get("/subscription/:userId/:eventId", getNotificationsByUserEvent);
router.post("/:eventId", upload.single("image"), createEventNotification);
router.delete("/:id", deleteNotification);
router.put("/:id", editNotification);
//soft delete
router.put("/updateIsRead/:notificationId", updateNotificationIsRead);
router.put("/updateIsDeleted/:notificationId", updateNotificationIsDeleted);

export default router;
