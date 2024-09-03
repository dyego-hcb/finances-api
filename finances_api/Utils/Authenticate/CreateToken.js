// /Utils/Authenticate/CreateToken.js

const jwt = require("jsonwebtoken");

const CreateUserToken = async (user, req, res) => {
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    const token = jwt.sign(
        {
            name: user.name,
            id: user.id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        message: "You Are Authenticated!",
        token: token,
        userId: user.id
    });
};

module.exports = CreateUserToken;
