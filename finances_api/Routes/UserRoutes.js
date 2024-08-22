const express = require('express');

// CONTROLLER
const UserController = require('../Controllers/UserController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/auth', CheckToken, UserController.getAuthenticatedUser);
router.put('/auth/update', CheckToken, UserController.updateAuthenticatedUser);

module.exports = router;
