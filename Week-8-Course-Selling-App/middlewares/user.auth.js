const jwt = require("jsonwebtoken");

function userAuthMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.JWT_USER_SECRET);

    if (!decodedData) {
        return res.status(403).json({
            message: "Not able to sign in",
        })
    } else {
        req.headers.username = decodedData.firstName;
        req.headers.userId = decodedData.userId;
        next();
    }
}

module.exports = {
    userAuthMiddleware
}