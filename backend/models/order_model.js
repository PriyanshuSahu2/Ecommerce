const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    total_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    payment_status: { type: String, default: "pending" },
    shipping_address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema);
