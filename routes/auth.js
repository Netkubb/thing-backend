const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handlerLogin);

module.exports = router;