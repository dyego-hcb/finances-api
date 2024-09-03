// /Utils/Authenticate/CheckAuth.js

const jwt = require('jsonwebtoken');
const GetToken = require('./GetToken');

const CheckAuth = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!req.headers.authorization) {
        return next();
    }

    const token = GetToken(req);

    if (!token) {
        return next();
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        res.status(403).json({ message: "Access Forbidden: You are already logged in" });
    } catch (err) {
        next();
    }
};

module.exports = CheckAuth;
