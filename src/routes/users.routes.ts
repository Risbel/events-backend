import { Router } from 'express'
const router = Router()

import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controllers'

router.get('/', getUsers)
router.get("/:id", getUser)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router

