// Create a new product
import CreateCollection from "../models/createcollection.model.js";
import Product from "../models/addproduct.model.js";
import deleteImageFile from "../utils/deleteImageFile.js";
import multer from "multer";
import path from "path";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "src/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); // Add Multer instance

export const addProduct = async (req, res) => {
  upload.array("images", 4)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }

    try {
      let { title, description, price, compareAtPrice, stock, collection, vendor, subcollections } = req.body;

      // ✅ Validate required fields
      if (!title || !description || !price || !compareAtPrice || !stock || !vendor || !collection) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // ✅ Validate image files
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Images are required" });
      }

      const images = req.files.map((file) => `/uploads/${file.filename}`);

      // ✅ Parse collection (if string)
      if (!Array.isArray(collection)) {
        try {
          collection = JSON.parse(collection);
        } catch (error) {
          return res.status(400).json({ message: "Invalid collection format" });
        }
      }

      // 🔍 Log and safely parse subcollections
      console.log("🧾 Raw subcollections from req.body:", req.body.subcollections);
      try {
        if (typeof subcollections === "string") {
          subcollections = JSON.parse(subcollections); // expecting: [{ collectionId, subcollectionName }]
          console.log("✅ Parsed subcollections:", subcollections);
        }
      } catch (err) {
        console.log("❌ JSON Parse failed for subcollections:", err);
        return res.status(400).json({ message: "Invalid subcollections format" });
      }

      // ✅ Create and save product
      const product = new Product({
        title,
        description,
        images,
        price,
        compareAtPrice,
        stock,
        vendor,
        collection,
        subcollections
      });

      await product.save();

      // ✅ Add product to main collections
      for (let colId of collection) {
        const collectionDoc = await CreateCollection.findById(colId);
        if (collectionDoc) {
          collectionDoc.products.push(product._id);
          await collectionDoc.save();
        }
      }

      // ✅ Add product to subcollections
      if (subcollections && subcollections.length > 0) {
        console.log("🧩 Raw subcollections from req.body:", subcollections);

        const parsedSubcollections = Array.isArray(subcollections)
          ? subcollections
          : JSON.parse(subcollections);

        console.log("✔Parsed subcollections:", parsedSubcollections);

        // 🆕 FETCH collections
        const allCollections = await CreateCollection.find({});

        parsedSubcollections.forEach((scId) => {
          const [collectionId, subIndex] = scId.split("-");

          console.log("Looping for:", collectionId, subIndex);

          const collection = allCollections.find((col) => col._id.toString() === collectionId);

          if (!collection) {
            console.error("❌ Collection not found for ID:", collectionId);
            return;
          }

          const subcollection = collection.subcollections[parseInt(subIndex)];

          if (!subcollection) {
            console.warn("⚠️ Subcollection not found at index:", subIndex);
            return;
          }

          console.log(`✅ Adding product to Collection (${collection.title}) → Subcollection: ${subcollection.subcollectionName}`);

          subcollection.products.push(product._id);
        });

        // Save all updated collections
        for (const col of allCollections) {
          await col.save();
        }
      }



      res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
      console.error("❌ Backend Error:", error);
      res.status(500).json({ message: "Failed to add product", error: error.message });
    }
  });
};





// Get all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("collection"); // ✅ Populate collection
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

// New controller function to fetch product titles and images for the navbar

export const getProductsForNavbar = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ message: "No product IDs provided" });
    }

    const products = await Product.find({ '_id': { $in: ids } }).select('title image');

    if (!products.length) return res.status(404).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products for navbar", error: error.message });
  }
};

// ---------------------- Update Product ----------------- 

export const updateProduct = async (req, res) => {
  try {
    const { images: newImages } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete removed images from upload folder
    const removedImages = product.images.filter((img) => !newImages.includes(img));
    removedImages.forEach((imgPath) => deleteImageFile(imgPath));

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: newImages },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};


// ------------- Delete a product by ID ------------------ 

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Delete associated images
    if (deletedProduct.images && deletedProduct.images.length > 0) {
      for (const img of deletedProduct.images) {
        deleteImageFile(img);
      }
    }

    // ✅ Remove from collections and subcollections
    const collectionIds = deletedProduct.collection || [];
    const subcollections = deletedProduct.subcollections || [];

    for (const collectionId of collectionIds) {
      const collection = await CreateCollection.findById(collectionId);
      if (!collection) continue;

      // Remove from collection.products
      collection.products = collection.products.filter(
        (id) => id.toString() !== productId
      );

      // Remove from matching subcollection's products
      if (Array.isArray(collection.subcollections)) {
        collection.subcollections = collection.subcollections.map((sub) => {
          if (
            sub &&
            sub.products &&
            subcollections.includes(`${collectionId}-${subcollectionIndex(collection, sub.subcollectionName)}`)
          ) {
            sub.products = sub.products.filter(
              (id) => id.toString() !== productId
            );
          }
          return sub;
        });
      }

      await collection.save();
    }

    res.status(200).json({ message: "Product and references deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// Helper to get subcollection index (based on _id format logic)
function subcollectionIndex(collection, name) {
  return collection.subcollections.findIndex(
    (sub) => sub.subcollectionName === name
  );
}



//  ------ product filteration for product page ------ 


import mongoose from "mongoose";

export const filterProducts = async (req, res) => {
  try {
    const { collections, minPrice, maxPrice, tags, sortBy } = req.body;

    const filter = {};

    // ✅ Correct field name: 'collection'
    if (collections && collections.length > 0) {
      filter.collection = {
        $in: collections.map(id => new mongoose.Types.ObjectId(id)),
      };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === "asc") sortOption = { price: 1 };
    if (sortBy === "desc") sortOption = { price: -1 };

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



// ------------ search input home page ------- 


export const searchProductsInput = async (req, res) => {
  try {

    const query = req.query.query;

    if (!query || query.trim() === "") {
      console.log("⚠️ No query provided");
      return res.status(400).json({ error: "Query is required" });
    }

    const regex = new RegExp(query, "i");

    const results = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    console.log("✅ Products Found:", results.length);
    res.json(results);
  } catch (error) {
    console.error("❌ Error in searchProductsInput:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};