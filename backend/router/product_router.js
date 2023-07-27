const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const ProductModel = mongoose.model("ProductModel");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get All Products
router.get("/", (req, res) => {
  const categoriesParam = req.query.Categories;
  const brandParam = req.query.Brand;
  const searchQuery = req.query.search;
  const categories = categoriesParam ? categoriesParam.split(",") : [];
  const brands = brandParam ? brandParam.split(",") : [];
  const filter = {};

  if (categories.length > 0) {
    // Add a filter for categories
    filter.categories = { $in: categories };
  }

  if (brands.length > 0) {
    // Add a filter for brands
    filter.brand = { $in: brands };
  }

  if (searchQuery) {
    filter.$text = { $search: searchQuery };
    console.log(req.query.Brand);
  }
  ProductModel.find(filter)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// find One Product
router.get("/:id", (req, res) => {
  ProductModel.findById(req.params.id)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});
module.exports = router;
