import mongoose from 'mongoose';

// Database connection function
export const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/shopifynest`);
        console.log("Database connected successfully");
    }catch(err){
        console.error("Database connection failed:", err);
        process.exit(1);
    }
}