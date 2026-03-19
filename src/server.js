import dotenv from "dotenv/config";
import app from "./app.js";
import mongoose from "mongoose";

// define port
const PORT = process.env.PORT || 3000;

// create test api endpoint
// app.get("/test", (req, res) => {
//     res.send("<h1>This is our test api endpoint</h1>");
// });

let isConnected = false;
let connectPromise = null;

async function connectToMongoDB() {
  if (isConnected) return;
  if (!connectPromise) {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const dbName = process.env.MONGODB_DB_NAME || "shopifynest";

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set");
    }

    connectPromise = mongoose
      .connect(mongoUri, { dbName })
      .then(() => {
        isConnected = true;
        console.log(`Successfully connected to MongoDB (${dbName})`);
      })
      .catch((error) => {
        connectPromise = null;
        console.error("Error connecting to MongoDB:", error);
        throw error;
      });
  }
  await connectPromise;
}

// add middleware
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectToMongoDB();
    }
    next();
  } catch (error) {
    next(error);
  }
});




if (process.env.VERCEL !== "1") {
  connectToMongoDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server due to database connection error:", err);
      process.exit(1);
    });
}

export default app;