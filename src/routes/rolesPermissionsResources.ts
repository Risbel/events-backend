import { Router } from "express";
import {
  createRolesPermissionsResources,
  deleteRolePermissionResource,
  getPermissionsByRoleId,
  getResourcesByPermissionId,
} from "../controllers/rolesPermissionsResources.controllers";

const router = Router();

router.get("/permissions/:roleId", getPermissionsByRoleId);

router.get("/resources/:discoRoleId/:permissionId", getResourcesByPermissionId);

router.post("/:roleId", createRolesPermissionsResources);

router.delete("/:id", deleteRolePermissionResource);

export default router;
