const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  categories: {
    type: Array,
    require: true,
  },
});

mongoose.model("CategoriesModel", CategoriesSchema);
