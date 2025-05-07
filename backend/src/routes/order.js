
import express from "express";

import {
    placeOrder,
    getAllOrders
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/all", getAllOrders);

export default router;
