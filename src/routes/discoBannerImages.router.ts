import { Router } from "express";
import {
  createBannerImages,
  deleteBannerImage,
  getBannerImageById,
  getBannerImages,
} from "../controllers/discoBannerImages";
import upload from "../utils/multer";

const router = Router();

router.get("/", getBannerImages);
router.get("/:discoDetailId", getBannerImageById);
router.post("/", upload.any(), createBannerImages);
router.delete("/:id", deleteBannerImage);

export default router;
