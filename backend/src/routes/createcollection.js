import { Router } from "express";
import {
  createNewCollection,
  getAllCollections,
  getAllAdminCollections,
  getCollectionBySlug,
  getSingleCollection,
  updateCollection,
  deleteCollection,
  getAllCollectionsForAdmin,
  getSubcollectionsByCollectionId,
  


  getSubcollectionsWithProducts,
  productsOfCollections
} from "../controllers/createcollection.controller.js";

const router = Router();

router.post("/create", createNewCollection);

router.get("/", getAllCollections); // For frontend (showOnFrontend: true)
router.get("/all", getAllAdminCollections); // For admin/dashboard (no filter)

// ← slug route must be before the numeric‐id route:
router.get("/slug/:slug", getCollectionBySlug);

router.get("/:id", getSingleCollection)
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);



// if you really need a separate admin path:
router.get('/admin/collections', getAllCollectionsForAdmin);
router.get("/subcollections/:id", getSubcollectionsByCollectionId);


// GET /api/subcollections-with-products

router.get("api/bytitle", getSubcollectionsWithProducts);

router.get("/product/:slug", productsOfCollections);

export default router;


