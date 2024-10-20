const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/userRoutes");
const { courseRouter } = require("./routes/courseRoutes");
const { adminRouter } = require("./routes/adminRoutes");

require("dotenv").config();

const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, function () {
        console.log(`Server started at port ${process.env.PORT}`);
        console.log(`DB connected`);
    });

}
main()

