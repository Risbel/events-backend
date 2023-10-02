import { Request, Response } from "express";
import Disco from "../models/Disco";
import DiscoRole from "../models/DiscoRole";
import rolePermissionResouce from "../models/rolePermissionResouce";

export const getDiscoRoles = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const discoRoles = await Disco.findAll({
      include: [
        {
          model: DiscoRole,
          include: [{ model: rolePermissionResouce, required: false }],
        },
      ],
    });

    return res.json(discoRoles);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDiscoRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { discoId } = req.params;

    const newDiscoRole = await DiscoRole.create({ name, discoId });

    return res.status(200).json({ newDiscoRole });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
