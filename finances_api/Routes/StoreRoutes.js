const express = require('express');

// CONTROLLER
const StoreController = require('../Controllers/StoreController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register', CheckToken, StoreController.registerStore);
router.get('/get/:id', CheckToken, StoreController.getStoreById);
router.get('/all', CheckToken, StoreController.getAllStores);
router.put('/update/:id', CheckToken, StoreController.updateStoreById);
router.delete('/delete/:id', CheckToken, StoreController.deleteStoreById);

module.exports = router;
