const { generateToken } = require("../middleware/authorization");
const User = require("../models/usermodel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.body;
    const isemail = await User.findOne({ email });
    if (isemail) {
      res.status(200).json({ error: "User already register" });
    }
    if (req.file) {
      profile_picture = req.file.filename; // Update profile picture if new one is uploaded
    }

    const user = new User({
      name,
      email,
      password,
      profile_picture,
      role,

      bio,
    });
    const token = generateToken(user);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      token: token,
      status: true,
    });
    console.log("Res >>>>>>>>>>>>>>>", user);
    console.log("Token >>>>>>>>>>>>>>>", token);
  } catch (error) {
    console.log("Error >>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
    console.log("Res >>>>>>>>>>>>>>>", user);
  } catch (error) {
    console.log("Error >>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};

const getallUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
    console.log("Res >>>>>>>>>>>>>>>", users);
  } catch (error) {
    console.log("Error >>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id });
    if (user) {
      res.status(404).json({ err: "user not Found" });
    }
    console.log("Res >>>>>>>>>>>>>>>", user);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error>>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};
const deletUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ id });
    if (user) {
      res.status(404).json({ err: "user not Found" });
    }
    console.log("Res >>>>>>>>>>>>>>>", user);
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error>>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.file) {
      profile_picture = req.file.filename; // Update profile picture if new one is uploaded
    }
    const { name, email, role, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, role, bio, profile_picture, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error>>>>>>>>>>>>>>>", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getallUser,
  getSingleUser,
  updateUser,
  deletUser,
};
