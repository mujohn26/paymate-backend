const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();


router.post("/create",userController.default.registerUser);

module.exports = router;
