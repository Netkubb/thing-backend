const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const regController = require("../controllers/registerController");
const userController = require("../controllers/userController");

router.post("/login", authController.handlerLogin);
router.post("/register", regController.handlerRegister);
router.get("/me", userController.getUserProfile);

module.exports = router;
