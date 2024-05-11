import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
   
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    uID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String, // we will hash it before saving it to the database
      required: [true, "Password is required"],
    },
   
    orgName: {
      type: String,
      required: true,
      trim: true,
    },
    phNo: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

adminSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.userExists = async function (username, email, uID) {
  const admin = await this.model("Admin").findOne({
    $or: [{ username }, { email }, {uID}],
  });

  if (this.username === username) return "Username already exists";
  if (this.email === email || this.uID === uID) return "Email already exists";
  return false;
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;