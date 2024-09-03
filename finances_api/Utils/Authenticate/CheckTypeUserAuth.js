// /Utils/Authenticate/CheckTypeUserAuth.js

const GetUserAuth = require('./GetUserAuth');

const CheckTypeUserAuth = (allowedTypes) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = await GetUserAuth(token);

        if (allowedTypes.includes(user.userType)) {
            req.user = user;
            next();
        } else {
            res.status(403).json({ message: "Access Forbidden: You do not have permission to access this resource" });
        }
    } catch (error) {
        res.status(401).json({ message: "Denied Access: Invalid token or user not authorized" });
    }
};

module.exports = CheckTypeUserAuth;
