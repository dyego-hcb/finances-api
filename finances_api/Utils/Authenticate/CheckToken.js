const jwt = require("jsonwebtoken");
const GetToken = require('./GetToken');

const CheckToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Denied Access !!" });
    }

    const token = GetToken(req);

    if (!token) {
        return res.status(401).json({ message: "Denied Access !!" });
    }

    try {
        const verified = jwt.verify(token, "4e1a3f9e18ecfcb4c8a7245d6a3e9062c1c6d5b2953b2c8a17e646d647d6e3a1");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token !!" });
    }
}

module.exports = CheckToken;