const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const DealsModel = mongoose.model("DealsModel");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newDeals = new DealsModel(req.body);
  try {
    const savedDeals = await newDeals.save();
    res.status(200).json(savedDeals);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get All Deals
router.get("/", (req, res) => {
  DealsModel.find()
    .then((Deals) => {
      res.status(200).json(Deals[0]);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
