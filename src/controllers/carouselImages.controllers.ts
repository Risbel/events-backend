import { Request, Response } from "express";
import DiscoImage from "../models/DiscoImage";
import { uploadMultipleImages } from "../utils/minio";

export const getImages = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const images = await DiscoImage.findAll();
    return res.json(images);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCarouselImages = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { discoDetailsId } = req.body;
    const imagesToUpload: any = req.files;

    const imgsUloaded = await uploadMultipleImages(imagesToUpload);
    const imagesToInsert = imgsUloaded.map((image: any) => ({
      image: `https://${encodeURI(image)}`,
      discoDetailId: discoDetailsId,
    }));
    const newCarouselImages: any = await DiscoImage.bulkCreate(imagesToInsert);

    return res.status(200).json({ images: newCarouselImages });
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
