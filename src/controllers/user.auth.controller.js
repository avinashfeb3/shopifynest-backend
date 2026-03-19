import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Login
const login = async (req, res) => {
  try {
    // validate email and password
    const { email, password } = req.body;

    // validate request
    if ([email, password].some((field) => field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
        data: {},
      });
    }
    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid crdentials.",
        data: {},
      });
    }

    // check the password is correct or incorrect
    const passwordMatched = await user.isPasswordMatched(password);

    // if password not matched
    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid crdentials.",
        data: {},
      });
    }

    // if password matched generate the token
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: {
        token: user.generateAccessToken(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to login. Please try again later.",
    });
  }
};

// User Registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate request
    if ([name, email, password].some((field) => field.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
        data: {},
      });
    }

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered. Please try different email id.",
        data: {},
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "Unable to register user. Please try again later.",
      data: {},
    });
  }
};

export { login, register };
