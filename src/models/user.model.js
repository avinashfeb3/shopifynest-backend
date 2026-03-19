import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    billing_address: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

// Create a method to accept the password for authentication
userSchema.methods.isPasswordMatched = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Generate the access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
}

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;