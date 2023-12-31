const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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
  categories: { type: String },
  sizes: {
    type: Array,
  },
  desc: {
    type: String,
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

ProductSchema.index({
  productName: "text",
  desc: "text",
  categories: "text",
  brand: "text",
  price: "text",
});
mongoose.model("ProductModel", ProductSchema);
