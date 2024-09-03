// /Routes/AddressRoutes.js

const express = require('express');

// CONTROLLER
const AddressController = require('../Controllers/AddressController');

// UTILS
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

router.post('/register', CheckTypeUserAuth('ADMIN'), AddressController.registerAddress);
router.get('/get/:id', CheckTypeUserAuth('ADMIN'), AddressController.getAddressById);
router.get('/all', CheckTypeUserAuth('ADMIN'), AddressController.getAllAddresss);
router.put('/update/:id', CheckTypeUserAuth('ADMIN'), AddressController.updateAddressById);
router.delete('/delete/:id', CheckTypeUserAuth('ADMIN'), AddressController.deleteAddressById);

module.exports = router;
