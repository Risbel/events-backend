import { Request, Response } from "express";
import DiscoImage from "../models/DiscoImage";

export const getImages = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const images = await DiscoImage.findAll();
    return res.json(images);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createDiscoImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { discoDetailId } = req.params;
    const { image, imageText } = req.body;

    const newDiscoImage: any = await DiscoImage.create({
      discoDetailId,
      image,
      imageText,
    });

    return res.status(200).json({ disco: newDiscoImage });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDiscoImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await DiscoImage.destroy({
      where: { id },
    });

    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
