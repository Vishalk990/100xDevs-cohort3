const jwt = require("jsonwebtoken");

function adminAuthMiddlware(req, res, next) {
    const token = req.headers.token;

    const decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

    if (!decode) {
        return res.status(403).json({
            message: "Not able to sign in",
        })
    } else {
        req.headers.username = decode.username
        req.headers.adminId = decode.adminId
        next();
    }
}
module.exports = {
    adminAuthMiddlware
}