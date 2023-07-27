const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  img: { type: Array, required: true },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categories: { type: Array },
  sizes: {
    type: Array,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

ProductSchema.index({ productName: "text", desc: "text" });
mongoose.model("ProductModel", ProductSchema);
