// /Routes/AddressStoreRoutes.js

const express = require('express');

// CONTROLLER
const AddressStoreController = require('../Controllers/AddressStoreController');

// UTILS
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

router.post('/register-address-store', CheckTypeUserAuth('ADMIN'), AddressStoreController.addAddressToStore);
router.get('/get-all/addres-store/:storeId', CheckTypeUserAuth('ADMIN'), AddressStoreController.getAllAddressToStore);
router.get('/get/address-store/:addressStoreId/:addressId', CheckTypeUserAuth('ADMIN'), AddressStoreController.getAddressToStoreById);
router.put('/edit/address-store/:addressStoreId', AddressStoreController.updateAddressToStoreById);
router.delete('/delete/address-store/:addressStoreId', AddressStoreController.deleteAddressToStoreById);

module.exports = router;
