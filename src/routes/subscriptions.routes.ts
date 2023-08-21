import { Router } from 'express'
const router = Router()

import { getSubscriptions, getSubscriptionsByIdUser, createSubscription, deleteSubscription } from '../controllers/subscriptions.controllers'

router.get("/", getSubscriptions)
router.get("/:id", getSubscriptionsByIdUser)
router.post("/:id", createSubscription)
router.delete("/:id", deleteSubscription)

export default router