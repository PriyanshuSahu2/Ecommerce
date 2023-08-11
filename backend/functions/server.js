const express = require("express");
const serverless = require("serverless-http");
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
const { PAYPAL_CLIENT_ID, MONGODB_URL } = require("./config");
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DB Connected "))
  .catch((err) => console.log("Error On mongose ,connenction " + err));

app.get("/api/keys/paypal", (req, res) => {
  res.send(PAYPAL_CLIENT_ID || "sb");
});

// Serve static files from the "uploads" directory
app.use("/images", express.static(path.join(__dirname, "images")));

const BASE_URL = "/.netlify/functions/server";
// Use the user router for '/user' routes
app.use(`${BASE_URL}/user`, userRouter);
app.use(`${BASE_URL}/products`, productRouter);
app.use(`${BASE_URL}/cart`, cartRouter);
app.use(`${BASE_URL}/categories`, categoriesRouter);
app.use(`${BASE_URL}/brands`, brandsRouter);
app.use(`${BASE_URL}/deals`, dealsRouter);
app.use(`${BASE_URL}/address`, addressRouter);
app.use(`${BASE_URL}/featuredProducts`, featureProductsRouter);
app.use(`${BASE_URL}/orders`, orderRoutes);
app.use(`${BASE_URL}/reviews`, reviewRoutes);
app.use(`${BASE_URL}/sales`, statsRoutes);

module.exports.handler = serverless(app);
