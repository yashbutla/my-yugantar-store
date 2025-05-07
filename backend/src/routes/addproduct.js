import express from "express";
import {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsForNavbar,
    filterProducts,
    searchProductsInput 
} from "../controllers/addproduct.controller.js";

const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get('/search', searchProductsInput)
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post("/getproducts", getProductsForNavbar);

router.post('/filterproducts', filterProducts);
export default router;



