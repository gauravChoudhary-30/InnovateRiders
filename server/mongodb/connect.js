import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`,
    );
    console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDB;