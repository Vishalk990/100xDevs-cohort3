import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  courseId: { type: mongoose.Types.ObjectId, ref: "course" },
});

const purchaseModel = mongoose.model("purchase", purchaseSchema);

export default purchaseModel;
