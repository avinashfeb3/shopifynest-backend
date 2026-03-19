import dotenv from "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import mongoose, { mongo } from "mongoose";

// define port
const PORT = process.env.PORT || 3000;

// create test api endpoint
// app.get("/test", (req, res) => {
//     res.send("<h1>This is our test api endpoint</h1>");
// });

let isConnected = false;

async function connectToMongoDB() {
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Successfully connected to MongoDB");
  }catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to be caught in the outer catch block
  }
}

// add middleware
app.use((req, res, next) => {
  if(!isConnected) {
    connectToMongoDB();
  }
  next();
});




// Database connection
// connectDB().then(() => {
//   // start server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   })
// })
// .catch((err) => {
//     console.error("Failed to start server due to database connection error:", err);
// })

module.exports = app;