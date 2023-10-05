import { Request, Response } from "express";
import Permission from "../models/Permission";

export const getPermissions = async (_req: Request, res: Response) => {
  try {
    const permissions = await Permission.findAll();
    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
