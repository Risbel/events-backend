import { Request, Response } from "express";
import rolePermissionResouce from "../models/rolePermissionResouce";
import Permission from "../models/Permission";
import Resource from "../models/Resource";

export const getPermissionsByRoleId = async (req: Request, res: Response) => {
  const { roleId } = req.params;
  try {
    const rolesPermissionsResouces = await rolePermissionResouce.findAll({
      where: {
        discoRoleId: roleId,
      },
      include: [
        {
          model: Permission,
        },
      ],
    });

    //loop to not repeat permissions
    const uniqueObjects = rolesPermissionsResouces.reduce((acc, obj: any) => {
      const existingObject = acc.find((item: any) => item.Permission.id === obj.Permission.id);

      if (!existingObject) {
        return acc.concat(obj);
      }

      return acc;
    }, []);

    // Extracting name and permissionId from uniqueObjects
    const permissionsData = uniqueObjects.map((obj: any) => ({
      name: obj.Permission.name,
      permissionId: obj.Permission.id,
    }));

    return res.status(200).json(permissionsData);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResourcesByPermissionId = async (req: Request, res: Response) => {
  try {
    const { discoRoleId, permissionId } = req.params;

    const resources = await rolePermissionResouce.findAll({
      where: { discoRoleId, permissionId },
      include: { model: Resource },
    });

    return res.status(200).json(resources);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRolesPermissionsResources = async (req: Request, res: Response) => {
  try {
    const { roleId: discoRoleId } = req.params;
    const { permission: permissionId, resource: resourceId } = req.body;

    const newPermission = await rolePermissionResouce.create({ discoRoleId, permissionId, resourceId });

    return res.status(200).json({ newPermission });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
