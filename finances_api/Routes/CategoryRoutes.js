// /Routes/CategoryRoutes.js

const express = require('express');

// CONTROLLER
const CategoryController = require('../Controllers/CategoryController');

// UTILS
const CheckTypeUserAuth = require('../Utils/Authenticate/CheckTypeUserAuth');

const router = express.Router();

router.post('/register', CategoryController.registerCategory);
router.get('/get-all/:storeId', CategoryController.getAllCategoryByStoreId);
router.get('/get/:categoryId', CategoryController.getCategoryById);
router.put('/edit/:categoryId', CategoryController.updateCategoryById);
router.delete('/delete/:categoryId', CategoryController.deleteCategoryById);

module.exports = router;
