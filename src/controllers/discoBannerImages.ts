import { Request, Response } from "express";
import DiscoBannerImage from "../models/DiscoBannerImage";

export const getBannerImages = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const images = await DiscoBannerImage.findAll();
    return res.status(200).json(images);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBannerImageById = async (req: Request, res: Response): Promise<Response> => {
  const { discoDetailId } = req.params;

  try {
    const image = await DiscoBannerImage.findAll({ where: { discoDetailId: discoDetailId } });
    return res.status(200).json(image);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBannerImages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { discoDetailId } = req.params;
    const { bannerImages } = req.body;

    const imagesToInsert = bannerImages.map((image: any) => ({ image: image.name, discoDetailId }));

    const newDiscoBannerImages: any = await DiscoBannerImage.bulkCreate(imagesToInsert);

    return res.status(200).json({ disco: newDiscoBannerImages });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBannerImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await DiscoBannerImage.destroy({
      where: { id },
    });

    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
