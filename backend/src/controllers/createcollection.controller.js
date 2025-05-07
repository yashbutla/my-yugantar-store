import CreateCollection from "../models/createcollection.model.js";
import upload from "../middlewares/upload.middleware.js";
import Product from "../models/addproduct.model.js";
import deleteImageFile from "../utils/deleteImageFile.js";
import slugify from "slugify";


export const createNewCollection = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      const { title, description, subcollections, showOnFrontend, showInNavigation } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!title || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const slug = slugify(title, { lower: true, strict: true }).trim();

      // ✅ Parse subcollections string from frontend
      let parsedSubcollections = [];
      if (subcollections) {
        const array = subcollections.split(",").map(item => item.trim());
        parsedSubcollections = array.map(name => ({
          subcollectionName: name,
          products: []
        }));
      }

      // ✅ Create new collection document
      const newCollection = new CreateCollection({
        title,
        slug,
        description,
        image,
        showOnFrontend: showOnFrontend === "true" || showOnFrontend === true,
        showInNavigation: showInNavigation === "true" || showInNavigation === true,
        subcollections: parsedSubcollections,
      });

      await newCollection.save();

      return res.status(201).json({
        message: "Collection created successfully",
        collection: newCollection
      });

    } catch (error) {
      console.error("❌ Error creating collection:", error);
      return res.status(500).json({
        message: "Failed to create collection",
        error: error.message
      });
    }
  });
};



// ✅ Get All Collections For frontend (showOnFrontend: true)
export const getAllCollections = async (req, res) => {
  try {
    const collections = await CreateCollection.find({ showOnFrontend: true })
      .select("title slug image products showOnFrontend subcollections")
      .populate("products", "title images")
      .populate("subcollections.products", "title images");

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch collections", error: error.message });
  }
};


// ✅ Get All Collections For admin/dashboard (no filter, product adding)
export const getAllAdminCollections = async (req, res) => {
  try {
    const collections = await CreateCollection.find()
      .select("title slug image products showOnFrontend subcollections")
      .populate("products", "title images")
      .populate("subcollections.products", "title images");


    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch collections", error: error.message });
  }
};


// ✅ Get Single Collection 
export const getSingleCollection = async (req, res) => {
  try {
    const collection = await CreateCollection.findById(req.params.id)
      .populate("products");

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch collection",
      error: error.message,
    });
  }
};


// ✅  Update Collection 

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, showOnFrontend, products, subcollections } = req.body;

    const collection = await CreateCollection.findById(id);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Save old product list for comparison
    const oldProductIds = collection.products.map(p => p.toString());

    // Update fields
    if (title) {
      collection.title = title;
      collection.slug = title.toLowerCase().split(" ").join("-");
    }
    if (description) collection.description = description;
    if (typeof showOnFrontend !== "undefined") collection.showOnFrontend = showOnFrontend;
    if (image) collection.image = image;

    // Parse subcollections (if passed as string from form-data)
    if (subcollections) {
      try {
        collection.subcollections = typeof subcollections === "string" ? JSON.parse(subcollections) : subcollections;
      } catch (err) {
        return res.status(400).json({ message: "Invalid subcollections format" });
      }
    }

    // Handle updated product list
    const newProductIds = products || [];
    collection.products = newProductIds;

    // Identify removed products
    const removedProductIds = oldProductIds.filter(pid => !newProductIds.includes(pid));

    for (const prodId of removedProductIds) {
      const product = await Product.findById(prodId);

      // 1. Delete product image from uploads folder
      if (Array.isArray(product?.images)) {
        product.images.forEach(img => deleteImageFile(img));
      }
      // 2. Delete product document from DB
      await Product.findByIdAndDelete(prodId);
    }

    await collection.save();

    res.status(200).json({ message: "Collection updated successfully", collection });

  } catch (error) {
    console.error("Error in updateCollection:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// ✅ Delete Collection

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await CreateCollection.findById(id).populate("products");

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // 1. Delete collection image
    deleteImageFile(collection.image);

    // 2. Delete product images and product entries
    for (const product of collection.products) {
      for (const img of product.images) {
        deleteImageFile(img);
      }
      await Product.findByIdAndDelete(product._id); // Optional: delete product doc
    }

    // 3. Delete the collection
    await CreateCollection.findByIdAndDelete(id);

    res.status(200).json({ message: "Collection and associated products deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete collection",
      error: error.message,
    });
  }
};


// ✅ Get All Collections for Admin (including showOnFrontend: false)
export const getAllCollectionsForAdmin = async (req, res) => {
  try {
    const collections = await CreateCollection.find()
      .select("title slug image products showOnFrontend subcollections")
      .populate("products", "title images")
      .populate("subcollections.products", "title images");


    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch collections for admin", error: error.message });
  }
};


// ---- ✅ Get Collection by Slug (and its products) Fetching single collection products with name  ----- 
export const getCollectionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit) || 6; // Default to 6

    const collection = await CreateCollection
      .findOne({ slug })
      .populate({
        path: "products",
        options: { sort: { createdAt: -1 }, limit }
      });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    return res.status(200).json(collection.products);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch collection", error: error.message });
  }
};

// -------------------- 👇 from here subcollection started -----------------

// get All Subcollections From Collections 
export const getSubcollectionsByCollectionId = async (req, res) => {
  try {
    const collection = await CreateCollection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const subcollections = collection.subcollections.map((sub, index) => ({
      _id: `${collection._id.toString()}-${index}`, // fake ID for frontend
      subcollectionName: sub.subcollectionName,
      collectionId: collection._id.toString(),
    }));

    res.status(200).json(subcollections);
  } catch (err) {
    console.error("Error fetching subcollections:", err);
    res.status(500).json({ message: "Server error" });
  }
};


//  -------- 👇 Navigation work start from here --------------


// frontend navigation get Collections With Subcollections

export const getSubcollectionsWithProducts = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass collectionId as a param

    const collection = await CreateCollection.findById(id).lean()
    // .populate({
    //   path: 'subcollections.products', // Populate product data in subcollections
    //   model: 'Product', // Product model name
    //   select: 'name price image', // Select only the fields you need
    // });


    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    for (let sub of collection.subcollections) {
      sub.products = await Product.find({ _id: { $in: sub.products } })
        .select('title price image')
        .limit(4); // ⬅️ LIMIT to latest 4
    }

    // Send the populated collection with product details
    res.status(200).json(collection.subcollections);
  } catch (error) {
    console.error('Error fetching subcollections with products:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};



// ----controller for Product page (fetching all products to product page of single collection) ----

export const productsOfCollections = async (req, res) => {
  const { slug } = req.params;
  console.log("👉 Inline Route Slug:", slug);

  try {
    const collection = await CreateCollection.findOne({ slug });
    if (!collection) return res.status(404).json({ msg: "No collection" });

    const products = await Product.find({ collection: collection._id });
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
