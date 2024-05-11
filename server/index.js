import mongoose from "mongoose";
import connectDB from "./mongodb/connect.js";
import * as dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "../env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8081, () => {
      console.log(`Server is running on port ${process.env.PORT || 8081}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed !", err));