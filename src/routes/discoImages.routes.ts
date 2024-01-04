import { Router } from "express";
import { getImages, createDiscoImage, deleteDiscoImage } from "../controllers/discoImages.controllers";

const router = Router();

router.get("/", getImages);
router.post("/:discoDetailId", createDiscoImage);
router.delete("/:id", deleteDiscoImage);

export default router;
