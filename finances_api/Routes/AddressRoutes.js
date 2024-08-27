const express = require('express');

// CONTROLLER
const AddressController = require('../Controllers/AddressController');

// UTILS
const CheckToken = require('../Utils/Authenticate/CheckToken');

const router = express.Router();

router.post('/register', AddressController.registerAddress);
router.get('/get/:id', AddressController.getAddressById);
router.get('/all', AddressController.getAllAddresss);
router.put('/update/:id', AddressController.updateAddressById);
router.delete('/delete/:id', AddressController.deleteAddressById);

module.exports = router;
