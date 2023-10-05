import { Router } from "express";
import {
  createRolesPermissionsResources,
  getPermissionsByRoleId,
  getResourcesByPermissionId,
} from "../controllers/rolesPermissionsResources.controllers";

const router = Router();

router.get("/permissions/:roleId", getPermissionsByRoleId);

router.get("/resources/:discoRoleId/:permissionId", getResourcesByPermissionId);

router.post("/:roleId", createRolesPermissionsResources);

export default router;
