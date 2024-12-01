import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes";
import { MONGO_URL, PORT } from "./utils/constants";
// const { courseRouter } = require("./routes/courseRoutes");
// const { adminRouter } = require("./routes/adminRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(MONGO_URL);
  app.listen(process.env.PORT, function () {
    console.log(`Server started at port ${PORT}`);
    console.log(`DB connected`);
  });
}
main();
