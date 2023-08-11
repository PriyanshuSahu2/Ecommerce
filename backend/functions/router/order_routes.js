const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");
const order_model = require("../models/order_model");

const ProductModel = mongoose.model("ProductModel");
const Order = mongoose.model("OrderModel");

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order({ userId: req.user.id, ...req.body });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/getAllOrders", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate([
      {
        path: "userId",
        select: "email",
      },
      {
        path: "products.productId",
        select: "productName",
      },
    ]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate([
      {
        path: "userId",
        select: "email",
      },
    ]);

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.productId", "productName img brand categories")
      .lean();
    order.products = order.products.map((product) => ({
      productName: product.productId.productName,
      brand: product.productId.brand,
      img: product.productId.img,
      quantity: product.quantity,
      selectedSize: product.selectedSize,
      price: product.price,
    }));
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await order_model.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
