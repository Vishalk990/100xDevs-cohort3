import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  userName: { type: String, unique: true, required: true },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
