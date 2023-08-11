const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyTokenAndAdmin } = require("./verifyToken");
const Order = mongoose.model("OrderModel");
const User = mongoose.model("UserModel");
const Product = mongoose.model("ProductModel");

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Total Income
    const totalIncomeResult = await Order.aggregate([
      {
        $match: {
          payment_status: "Paid", // Consider only orders with a paid status
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$total_amount" },
        },
      },
    ]);

    const totalIncome =
      totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

    // Total Users
    const totalUsersResult = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
        },
      },
    ]);
    const totalUsers =
      totalUsersResult.length > 0 ? totalUsersResult[0].totalUsers : 0;

    // Total Orders
    const totalOrdersResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);
    const totalOrders =
      totalOrdersResult.length > 0 ? totalOrdersResult[0].totalOrders : 0;

    // Total Income by Month
    const totalIncomeByMonth = await Order.aggregate([
      {
        $match: {
          payment_status: "Paid", // Consider only orders with a paid status
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          totalIncome: { $sum: "$total_amount" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    // Sales by Categories
    const salesByCategories = await Order.aggregate([
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
          _id: "$products.category",
          totalSales: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
    ]);

    // Sales by Brands
    const salesByBrands = await Order.aggregate([
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
          _id: "$products.brand",
          totalSales: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
    ]);

    res.status(200).json({
      totalIncome,
      totalUsers,
      totalOrders,
      totalIncomeByMonth,
      salesByCategories,
      salesByBrands,
    });
  } catch (error) {
    console.error("Error while fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
