const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "user alreay exists" });
    }
    const user = new User({
      username,
      email,
      password,
      role: role || "User",
    });
    await user.save();
    const token = generateToken(user._id);

    res.status(200).json({
      msg: "user created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: "error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(404).json({ msg: "invalid password" });
    }
    const token = generateToken(user._id);
    res.json({
      msg: "login success",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: "error", error });
  }
};
module.exports = { register, login };
