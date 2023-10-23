import { Router } from "express";
const router = Router();

import {
  getSubscriptions,
  getSubscriptionsByIdUser,
  createSubscription,
  deleteSubscription,
  getSubscriptionRolePermissions,
  updateSubscription,
} from "../controllers/subscriptions.controllers";

router.get("/", getSubscriptions);
router.get("/:id", getSubscriptionsByIdUser);
router.get("/role/permissions/:userId/:discoId", getSubscriptionRolePermissions);
router.post("/:id", createSubscription);
router.put("/:id", updateSubscription);
router.delete("/:id", deleteSubscription);

export default router;
