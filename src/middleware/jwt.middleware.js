import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    // Get the token from the request header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided", data: {} });
    }
    
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.slice(7).trim() 
      : authHeader.trim();
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format", data: {} });
    } 
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.id);
    
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found", data: {} });
    }
    
    req.user = user;
    next(); 
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", data: {} });
  }
};

export default verifyJWT;