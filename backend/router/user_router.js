const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = mongoose.model("UserModel");
const dotenv = require("dotenv");

dotenv.config();
router.post("/signup", async (req, res) => {
  const { fullName, email, password, mobileNumber,isAdmin } = req.body;
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res.status(400).json({ error: "User Already Exist" });
      }
      bcryptjs
        .hash(password, 16)
        .then((hashedPassword) => {
          const user = new UserModel({
            fullName,
            email,
            password: hashedPassword,
            mobileNumber,
            isAdmin
          });
          user
            .save()
            .then((newUser) => {
              return res
                .status(201)
                .json({ result: "User Signed up Successfully!" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
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
              isAdmin:userInDB.isAdmin
            },
            process.env.JWT_SECRET
          );
          // Passwords match, user is authenticated
          // Here, you can generate a token or perform any other login-related operations
          const { password, ...other } = userInDB._doc;
          res.status(200).json({ message:"Login Successful",...other, accessToken });
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
module.exports = router;
