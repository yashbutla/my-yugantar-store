import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
