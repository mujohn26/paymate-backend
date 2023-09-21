const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();


router.post("/create",userController.default.registerUser);
router.post("/login",userController.default.userLogin);
router.delete("/delete/:id", userController.default.deleteUser);
router.get("/",userController.default.getAllUsers);
router.patch("/verify/:phone",userController.default.verifyOTP);
router.patch("/resend/:phone",userController.default.resendOTP);

module.exports = router;
