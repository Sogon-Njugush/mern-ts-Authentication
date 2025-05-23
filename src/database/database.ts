import mongoose from "mongoose";
import { config } from "../config/app.config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    process.exit(1);
  }
};

export default connectDB;
