const mongoose = require("mongoose");

const BrandsModel = new mongoose.Schema({
  brands: {
    type: Array,
    require: true,
  },
});

mongoose.model("BrandsModel", BrandsModel);
