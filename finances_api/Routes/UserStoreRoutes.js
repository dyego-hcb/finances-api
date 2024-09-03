// /Routes/UserStoreRoutes.js

const express = require('express');

// CONTROLLER
const UserStoreController = require('../Controllers/UserStoreController');

// UTILS
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

router.post('/register-user-store', CheckTypeUserAuth('ADMIN'), UserStoreController.addUserToStore);
router.get('/get-all/user-store/:storeId', CheckTypeUserAuth('ADMIN'), UserStoreController.getAllUserToStore);
router.get('/get-all/store-user/:userId', CheckTypeUserAuth('ADMIN'), UserStoreController.getAllStoreToUser);
router.get('/get/user-store/:userStoreId/:userId', CheckTypeUserAuth('ADMIN'), UserStoreController.getUserToStoreById);
router.put('/edit/user-store/:userStoreId', CheckTypeUserAuth('ADMIN'), UserStoreController.updateUserToStoreById);
router.delete('/delete/user-store/:userStoreId', CheckTypeUserAuth('ADMIN'), UserStoreController.deleteUserToStoreById);

module.exports = router;
