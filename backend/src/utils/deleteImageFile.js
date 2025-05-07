// utils/deleteImageFile.js
import fs from "fs";
import path from "path";

const deleteImageFile = (imagePath) => {
  if (!imagePath) return;

  // Remove starting slash if present
  const cleanPath = imagePath.replace(/^\//, "");
  const fullPath = path.join("src", cleanPath); // src/uploads/xyz.jpg

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted file: ${fullPath}`);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
};

export default deleteImageFile;
