const jwt = require("jsonwebtoken");
const GetToken = require('./GetToken');

const CheckToken = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Denied Access !!" });
    }

    const token = GetToken(req);

    if (!token) {
        return res.status(401).json({ message: "Denied Access !!" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token !!" });
    }
}

module.exports = CheckToken;