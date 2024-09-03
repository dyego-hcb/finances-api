// /Routes/HelloWordRoutes.js

const router = require('express').Router();

// CONTROLLER
const HelloWordController = require('../Controllers/HelloWordController');

router.get('/hello-word-api', HelloWordController.checkAPIConnection);
router.get('/hello-word-db', HelloWordController.checkDBConnection);

module.exports = router;
