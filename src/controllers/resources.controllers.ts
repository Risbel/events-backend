import { Request, Response } from "express";
import Resource from "../models/Resource";

export const getResources = async (_req: Request, res: Response) => {
  try {
    const resources = await Resource.findAll();
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
