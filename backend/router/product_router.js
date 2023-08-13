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
        $limit: 10, // Get only the top 5 products
      },
    ]);
    const result = await Order.populate(salesByProducts, [
      {
        path: "_id",
        model: "ProductModel", // Specify the model name of the referenced collection
      },
    ]);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//get All Products
router.get("/", async (req, res) => {
  // Extract query parameters from the request
  const searchQuery = req.query.searchQuery;
  const categories = req.query.category;
  const brands = req.query.brand;

  try {
    // Initialize an empty query object to build the MongoDB query
    let query = {};

    // Check if a search query parameter is provided
    if (searchQuery) {
      // Build a text search query using the provided search query
      query.$text = { $search: searchQuery };
    }

    // Check if brand filter parameters are provided
    if (brands) {
      // Create a regex pattern for each brand and match case-insensitively
      query.brandName = { $in: brands.map((brand) => new RegExp(brand, "i")) };
    }

    // Check if category filter parameters are provided
    if (categories) {
      // Create a regex pattern for each category and match case-insensitively
      query.category = {
        $in: categories.map((category) => new RegExp(category, "i")),
      };
    }

    let products;

    // Check if there are any query parameters
    if (Object.keys(query).length === 0) {
      // If no query parameters, return all products
      products = await ProductModel.find();
    } else {
      // Otherwise, perform the search with filters
      products = await ProductModel.find(query);
    }

    // Respond with the fetched products in JSON format
    res.status(200).json(products);
  } catch (error) {
    // Handle errors by logging them and sending an internal server error response
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
