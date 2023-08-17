import { Router } from 'express'
const router = Router()

import { getAdmisions, getAdmisionsByIdDisco, createDiscoAdmision, updateDiscoAdmision, deleteDiscoAdmision } from '../controllers/discoAdmisions.controllers'

router.get("/", getAdmisions)
router.get("/:id", getAdmisionsByIdDisco)
router.post("/:id", createDiscoAdmision)
router.put("/:id", updateDiscoAdmision)
router.delete("/:id", deleteDiscoAdmision)

export default router