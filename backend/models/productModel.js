import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  bestSeller: {
    type: Boolean,
  },
  date: {
    type: Number,
    required: true,
  },
});
const productModel =
  mongoose.models.product || mongoose.model("products", productSchema);
export default productModel;
