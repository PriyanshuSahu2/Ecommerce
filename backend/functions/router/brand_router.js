const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const BrandsModel = mongoose.model("BrandsModel");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newBrands = new BrandsModel(req.body);
  try {
    const savedBrands = await newBrands.save();
    res.status(200).json(savedBrands);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get All Brands
router.get("/", (req, res) => {
  BrandsModel.find()
    .then((Brands) => {
    
      res.status(200).json(Brands[0].brands);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
