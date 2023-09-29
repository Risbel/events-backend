import { Router } from "express";
import { getImages, createDiscoImage } from "../controllers/discoImages.controllers";

const router = Router();

router.get("/", getImages);
router.post("/:discoDetailId", createDiscoImage);

export default router;
