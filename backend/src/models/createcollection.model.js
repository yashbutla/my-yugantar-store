import mongoose, { Schema } from "mongoose";

const createCollectionSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ],
  subcollections: [
    {
      subcollectionName: { type: String },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
    }
  ],
  slug: {
    type: String,
    // required: false,
    unique: true,
    lowercase: true,
  },
  showOnFrontend: {
    type: Boolean,
    default: false,
  },
  showInNavigation: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });



const CreateCollection = mongoose.model("CreateCollection", createCollectionSchema);
export default CreateCollection;
