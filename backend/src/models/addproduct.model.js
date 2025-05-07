import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate: [(val) => val.length <= 4, "Max 4 images allowed"]
    },
    price: {
        type: Number,
        required: true
    },
    compareAtPrice: {
        type: Number
    },
    stock: {
        type: Number,
        required: true
    },
    vendor: {
        type: String
    },
    collection: [{ type: mongoose.Schema.Types.ObjectId, ref: "CreateCollection", required: true }],
    subcollections: [{
        type: String
    }]
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
