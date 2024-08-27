const express = require('express');

// CONTROLLER
const AddressController = require('../Controllers/AddressController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register', CheckToken, AddressController.registerAddress);
router.get('/get/:id', CheckToken, AddressController.getAddressById);
router.get('/all', CheckToken, AddressController.getAllAddresss);
router.put('/update/:id', CheckToken, AddressController.updateAddressById);
router.delete('/delete/:id', CheckToken, AddressController.deleteAddressById);

module.exports = router;
