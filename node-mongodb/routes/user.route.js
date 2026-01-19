import express from "express";
import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// for edit name
router.patch("/", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;

  await User.findByIdAndUpdate(req.user._id, { name });

  return res.json({ status: "success" });
});

// for signup a user
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  //   to check the existing user
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(401)
      .json({ error: `user with the emial ${email} alerady exist` });
  }

  //   create the salt password
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // store the user in the database
  const user = await User.insertOne({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  return res.status(201).json({ sataus: "success", data: { id: user._id } });
});

// for login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res
      .status(404)
      .json({ error: `user with the mail id ${email} does not exist` });
  }
  const salt = existingUser.salt;
  const hashed = existingUser.password;

  const newhashed = createHmac("sha256", salt).update(password).digest("hex");

  if (hashed !== newhashed) {
    return res.status(400).json({ error: "invalid password " });
  }

  const payLoad = {
    name: existingUser.name,
    email: existingUser.email,
    _id: existingUser._id,
  };

  const token = jwt.sign(payLoad, process.env.JWT_SECRET);

  return res.json({ status: "success", token });
});

export default router;
