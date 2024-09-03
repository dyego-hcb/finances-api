// /Routes/StoreRoutes.js

const express = require('express');

// CONTROLLER
const StoreController = require('../Controllers/StoreController');

// UTILS
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

router.post('/register', CheckTypeUserAuth('ADMIN'), StoreController.registerStore);
router.get('/get/:id', CheckTypeUserAuth('ADMIN'), StoreController.getStoreById);
router.get('/all', CheckTypeUserAuth('ADMIN'), StoreController.getAllStores);
router.put('/update/:id', CheckTypeUserAuth('ADMIN'), StoreController.updateStoreById);
router.delete('/delete/:id', CheckTypeUserAuth('ADMIN'), StoreController.deleteStoreById);

module.exports = router;
