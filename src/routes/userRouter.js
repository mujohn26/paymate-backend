const express =require('express');
const userController =require ('../controller/userController');
const router = express.Router();


router.post("/create",userController.registerUser);
router.post("/login",userController.userLogin);
router.delete("/delete/:id", userController.deleteUser);
router.get("/",userController.getAllUsers);
router.patch("/verify/:phone",userController.verifyOTP);
router.patch("/resend/:phone",userController.resendOTP);

module.exports= router;
