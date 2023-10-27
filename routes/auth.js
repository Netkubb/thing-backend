const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const regController = require("../controllers/registerController");

router.post("/login", authController.handlerLogin);
router.post("/register", regController.handlerRegister);

module.exports = router;
