const express = require("express");

//Models Import
require("./models/user_models");
require("./models/product_model");
require("./models/cart_model");
require("./models/categories_model");
require("./models/deals_models");
require("./models/address_modal");
require("./models/brand_model");
require("./models/featureProducts_model");
require("./models/order_model");
require("./models/review_model");
require("./models/otp_model");
const mongoose = require("mongoose");
const userRouter = require("./router/user_router");
const productRouter = require("./router/product_router");
const cartRouter = require("./router/cart_router");
const categoriesRouter = require("./router/categories_router");
const brandsRouter = require("./router/brand_router");
const dealsRouter = require("./router/deals_router");
const addressRouter = require("./router/address_router");
const featureProductsRouter = require("./router/featureProducts_router");
const orderRoutes = require("./router/order_routes");
const reviewRoutes = require("./router/review_routes");
const statsRoutes = require("./router/stats_routes");
const dotenv = require("dotenv");
const path = require("path");

const PORT = 5000;
const app = express();
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected "))
  .catch((err) => console.log("Error On mongoose ,connection " + err));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Serve static files from the "uploads" directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Use the user router for '/user' routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/deals", dealsRouter);
app.use("/api/address", addressRouter);
app.use("/api/featuredProducts", featureProductsRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/sales", statsRoutes);

app.listen(PORT, () => {
  console.clear();
  console.log(`server Started on ${PORT}`);
});
