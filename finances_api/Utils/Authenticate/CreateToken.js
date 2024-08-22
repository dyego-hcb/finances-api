const jwt = require("jsonwebtoken");

const CreateUserToken = async (user, req, res) => {
    const token = jwt.sign(
        {
            name: user.name,
            id: user.id
        },
        "4e1a3f9e18ecfcb4c8a7245d6a3e9062c1c6d5b2953b2c8a17e646d647d6e3a1",
        { expiresIn: '1h' }
    );

    res.status(200).json({
        message: "You Are Authenticated!",
        token: token,
        userId: user.id
    });
};

module.exports = CreateUserToken;
