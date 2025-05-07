import { Router } from "express";
import { uploadSlider, getSliders, deleteBanner } from "../controllers/herosection.controller.js";

const router = Router();

// Correct API Endpoints
router.post("/uploadBanner", uploadSlider);
router.get("/getbanner", getSliders);
router.delete("/deleteBanner/:id", deleteBanner);

export default router;
