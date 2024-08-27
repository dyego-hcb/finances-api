const express = require('express');

// CONTROLLER
const UserStoreController = require('../Controllers/UserStoreController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register-user-store', UserStoreController.addUserToStore);
router.get('/get-all/user-store/:storeId', UserStoreController.getAllUserToStore);
router.get('/get-all/store-user/:userId', UserStoreController.getAllStoreToUser);
router.get('/get/user-store/:userStoreId/:userId', UserStoreController.getUserToStoreById);
router.put('/edit/user-store/:userStoreId', UserStoreController.updateUserToStoreById);
router.delete('/delete/user-store/:userStoreId', UserStoreController.deleteUserToStoreById);

module.exports = router;
