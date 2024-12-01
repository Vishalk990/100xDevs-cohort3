import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  creatorId: { type: mongoose.Types.ObjectId, ref: "admin" },
});

const courseModel = mongoose.model("course", courseSchema);

export default courseModel;
