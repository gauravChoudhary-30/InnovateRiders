import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../../mongodb/models/user.models.js";
import Admin from "../../mongodb/models/admin.models.js";
dotenv.config();

const router = express.Router();

// Register route
router.route("/register").post(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    // const existingUser = await User.userExists(username, email);
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    // console.log(existingUser);
    if (existingUser?.email === email)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    if (existingUser?.username === username)
      return res
        .status(401)
        .json({ success: false, message: "Username already exists" });
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login route
router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    // if (!User.isPasswordCorrect(password))
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    res.status(200).json({
      success: true,
      data: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//get user route
router.route("/getuser/:username").get(async (req, res) => {
  try {
    console.log(req?.params?.username);
    const usernamef = req?.params?.username;
    const user = await User.findOne({ username: usernamef });
    // console.log(user);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//get user by id route
router.route("/getuser/:userId").get(async (req, res) => {
  try {
    console.log(req?.params?.userId);
    const user = await User.findById({ _id: req?.params?.userId });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    console.log(user);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error, 99);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Admin Registration
router.route("/adminRegistration").post(async (req, res) => {
  const { name, username, email, uID, password, orgName, phNo } = req.body;
  console.log(req.body);
  try {
    // const existingUser = await User.userExists(username, email);
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { uID }, { username }],
    });
    // console.log(existingUser);
    if (existingAdmin?.email === email || existingAdmin?.uID === uID)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    if (existingAdmin?.username === username)
      return res
        .status(401)
        .json({ success: false, message: "Username already exists" });
    const newAdmin = await Admin.create({
      name,
      username,
      email,
      uID,
      password,
      orgName,
      phNo,
    });
    res.status(200).json({ success: true, data: newAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.route("/adminLogin").post(async (req, res) => {
  const { email, password, uID } = req.body;
  console.log(req.body);
  try {
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { uID }],
    });
    if (!existingAdmin)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    // if (!User.isPasswordCorrect(password))
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin?.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    res.status(200).json({
      success: true,
      data: existingAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.route("/").get(async (req, res) => {
  res.send("USI auth route");
});

export default router;
