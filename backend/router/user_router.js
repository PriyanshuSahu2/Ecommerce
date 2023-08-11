const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = mongoose.model("UserModel");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuth,
} = require("./verifyToken");

dotenv.config();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const OTPs = {};

console.log(process.env.GMAIL);
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const OTP = generateOTP();
  OTPs[email] = OTP;
  const mail = {
    from: "help.markethub@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `OTP is ${OTP}`,
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      console.log("Email Sent: " + info.response);
      res.status(200).send("Verification email sent Successfully");
    }
  });
});

router.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      mobileNumber,
      isAdmin,
      verificationCode,
    } = req.body;

    if (OTPs[email] !== parseInt(verificationCode)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const userInDB = await UserModel.findOne({ email: email });

    if (userInDB) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10); // Using 10 rounds for bcrypt hash

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber,
      isAdmin,
    });

    await newUser.save();
    OTPs[email] = undefined;
    res.status(201).json({ message: "User Signed up Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(400).json({ error: "User Not Exist" });
      }
      bcryptjs.compare(password, userInDB.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (isMatch) {
          const accessToken = jwt.sign(
            {
              id: userInDB._id,
              isAdmin: userInDB.isAdmin,
            },
            process.env.JWT_SECRET
          );
          // Passwords match, user is authenticated
          // Here, you can generate a token or perform any other login-related operations
          const { password, ...other } = userInDB._doc;
          res
            .status(200)
            .json({ message: "Login Successful", ...other, accessToken });
        } else {
          // Passwords don't match
          res.status(401).json({ error: "Invalid password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/getAllUser", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, verificationCode, password } = req.body;
    console.log();
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    if (OTPs[email] !== parseInt(verificationCode)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    OTPs[email] = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const userId = req.params.id; // Extract the user ID from the request parameters
    const { fullName, email, mobileNumber, password } = req.body; // Extract updated user data from the request body

    // Check if the authenticated user is allowed to perform this action (authorization logic)
    if (req.user.isAdmin || req.user._id === userId) {
      const userToUpdate = await UserModel.findById(userId);
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
      if (email !== userToUpdate.email) {
        // If the email is being changed, verify the email is unique
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
          return res.status(400).json({ error: "Email is already in use" });
        }
      }
      if (password) {
        // If a new password is provided, hash it
        const hashedPassword = await bcryptjs.hash(password, 10); // Using 10 rounds for bcrypt hash
        userToUpdate.password = hashedPassword;
      }
      userToUpdate.fullName = fullName;
      userToUpdate.email = email;
      userToUpdate.mobileNumber = mobileNumber;
      const updatedUser = await userToUpdate.save();

      res.status(200).json(updatedUser);
    } else {
      res
        .status(403)
        .json({ error: "You are not authorized to update this user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id/give-admin", verifyTokenAndAdmin, async (req, res) => {
  try {
    const targetUserId = req.params.id; // Extract the target user ID from the request parameters
    // Find the target user by ID
    const targetUser = await UserModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Give admin privileges to the target user
    targetUser.isAdmin = !targetUser.isAdmin;
    await targetUser.save();

    res.status(200).json({ message: "Admin privileges granted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User Profile Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
