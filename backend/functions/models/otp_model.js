const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiration: { type: Date, required: true },
  // Other fields as needed
});

const OTPModel = mongoose.model("OTP", OtpSchema);

module.exports = OTPModel;
