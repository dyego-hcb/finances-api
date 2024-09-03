// /Routes/UserRoutes.js

const express = require('express');

// CONTROLLER
const UserController = require('../Controllers/UserController');

// UTILS
const CheckAuth = require('../Utils/Authenticate/CheckAuth');
const CheckToken = require('../Utils/Authenticate/CheckToken');
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

// ROUTES USER
router.post('/register', UserController.registerUser);
router.post('/login', CheckAuth, UserController.loginUser);
router.get('/auth', CheckToken, UserController.getAuthenticatedUser);
router.put('/auth/update', CheckToken, UserController.updateAuthenticatedUser);
router.delete('/auth/delete', CheckToken, UserController.deleteAuthenticatedUser);

// ROUTES ADMIN
router.get('/all', CheckTypeUserAuth('ADMIN'), UserController.getAllUsers);
router.get('/get/:id', CheckTypeUserAuth('ADMIN'), UserController.getUserById);
router.put('/update/:id', CheckTypeUserAuth('ADMIN'), UserController.updateUserById);
router.delete('/delete/:id', CheckTypeUserAuth('ADMIN'), UserController.deleteUserById);

module.exports = router;
