const express = require('express');

// CONTROLLER
const UserController = require('../Controllers/UserController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/auth', CheckToken, UserController.getAuthenticatedUser);
router.get('/get/:id', UserController.getUserById);
router.get('/all', UserController.getAllUsers);
router.put('/auth/update', CheckToken, UserController.updateAuthenticatedUser);
router.put('/update/:id', UserController.updateUserById);
router.delete('/auth/delete', CheckToken, UserController.deleteAuthenticatedUser);
router.delete('/delete/:id', UserController.deleteUserById);

module.exports = router;
