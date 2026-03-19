import User from "../../models/user.model.js";

// Admin Authentication Controller
const login = async (req, res) => {
  try {
    // validate email and password
    const { email, password } = req.body;

    // validate request - check for undefined and empty strings
    if (!email || !password || email.trim() === "" || password.trim() === "") {
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
        message: "Invalid credentials.",
        data: {},
      });
    }

    // check the password is correct or incorrect
    const passwordMatched = await user.isPasswordMatched(password);

    // if password not matched
    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
        data: {},
      });
    }

    // Check if user is admin or not
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Admins only.",
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

export { login };
