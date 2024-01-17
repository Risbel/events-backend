import { Router } from "express";
import {
  createBannerImages,
  deleteBannerImage,
  getBannerImageById,
  getBannerImages,
} from "../controllers/discoBannerImages";

const router = Router();

router.get("/", getBannerImages);
router.get("/:discoDetailId", getBannerImageById);
router.post("/:discoDetailId", createBannerImages);
router.delete("/:id", deleteBannerImage);

export default router;
