import imageSlider from "../models/herosection.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import deleteImageFile from '../utils/deleteImageFile.js';

// Fix __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), "src/uploads")); // ✅ Save inside "src/uploads"
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single("image");


// Upload Slider Image
export const uploadSlider = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "File upload failed", error: err });
        }

        try {
            const bannerCount = await imageSlider.countDocuments(); // Count existing banners
            if (bannerCount >= 3) {
                return res.status(400).json({ success: false, message: "Banner limit reached. You can only upload up to 3 banners." });
            }

            const { title } = req.body;
            if (!title || !req.file) {
                return res.status(400).json({ success: false, message: "Title and Image are required" });
            }

            const newSlider = new imageSlider({
                title,
                image: `/uploads/${req.file.filename}`, // Store image path
            });

            await newSlider.save();
            res.json({ success: true, message: "Banner uploaded successfully!", banner: newSlider });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error saving to database", error });
        }
    });
};

// Get All Sliders
export const getSliders = async (req, res) => {
    try {
        const sliders = await imageSlider.find(); // Fetch banners
        res.status(200).json(sliders);
    } catch (error) {
        console.error("Error fetching banners:", error);
        res.status(500).json({ message: "Failed to fetch banners", error: error.message });
    }
};

// Delete Banner
export const deleteBanner = async (req, res) => {
    try {
        // Find the banner by its ID
        const banner = await imageSlider.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        // Use the deleteImageFile utility to remove the image
        deleteImageFile(banner.image); // banner.image contains the path to the image

        // Delete the banner document from the database
        await imageSlider.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error("Error deleting banner:", error);
        res.status(500).json({ message: "Failed to delete banner", error: error.message });
    }
};