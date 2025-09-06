import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//create token using mongodb user id
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else if (user && isMatch) {
      const token = createToken(user._id);
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = createToken(newUser._id);
    res.status(201).json({
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//route for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser, registerUser, loginAdmin };
