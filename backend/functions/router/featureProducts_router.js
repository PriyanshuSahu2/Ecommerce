const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const FeaturedProductsModel = mongoose.model("FeaturedProductsModel");
const ProductModel = mongoose.model("ProductModel");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newFeaturedProducts = new FeaturedProductsModel(req.body);
  try {
    const savedFeaturedProducts = await newFeaturedProducts.save();
    res.status(200).json(savedFeaturedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All FeaturedProducts
router.get("/", (req, res) => {
  FeaturedProductsModel.find()
    .populate("featuredProducts")
    .then((featuredProducts) => {
      const productIds = featuredProducts[0].featuredProducts;
      ProductModel.find({ _id: { $in: productIds } })
        .then((products) => {
          res.status(200).json(products);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: "Internal server error" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
