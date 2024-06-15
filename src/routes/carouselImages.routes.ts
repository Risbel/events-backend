import { Router } from "express";
import { getImages, createCarouselImages, deleteDiscoImage } from "../controllers/carouselImages.controllers";
import upload from "../utils/multer";

const router = Router();

router.get("/", getImages);
router.post("/", upload.any(), createCarouselImages);
router.delete("/:id", deleteDiscoImage);

export default router;
