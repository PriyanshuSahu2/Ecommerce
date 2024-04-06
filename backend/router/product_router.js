const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const getUploadMiddleware = require("../utils/upload");
const ProductModel = mongoose.model("ProductModel");
const Order = mongoose.model("OrderModel");
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/upload", getUploadMiddleware().array("images"), (req, res) => {
  if (req.files && req.files.length > 0) {
    const fileNames = req.files?.map((file) => file.path);
    res.json({ success: true, fileNames });
  } else {
    res.json({ success: false });
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
  }
  ProductModel.find(filter)
    .then((products) => {
      res.status(200).json(products.reverse());
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});
router.get("/top", async (req, res) => {
  try {
    const salesByProducts = await Order.aggregate([
      {
        $match: {
          payment_status: "Paid", // Consider only orders with a paid status
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalSales: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
      {
        $limit: 5, // Get only the top 5 products
      },
    ]);
    const result = await Order.populate(salesByProducts, [
      {
        path: "_id",
        model: "ProductModel", // Specify the model name of the referenced collection
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
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

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Deleted Successfully");
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
