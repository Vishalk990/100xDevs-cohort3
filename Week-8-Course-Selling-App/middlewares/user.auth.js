const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const mongoose = require("mongoose");

async function auth(req, res, next) {
    const token = req.headers.token;

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData) {
            return res.status(403).json({
                message: "Token Expired",
            })
        }

        console.log(decodedData);

        const user = await userModel.findOne({
            _id: new mongoose.Types.ObjectId(decodedData.userId)
        })

        if (!user) {
            return res.status(500).json({
                message: "Invalid User ID"
            })
        }

        req.headers.username = decodedData.firstName;
        req.headers.userId = decodedData.userId;

        next();
        
    } catch (err) {
        return res.status(401).json({
            error: err
        })
    }

};

module.exports = {
    auth
}