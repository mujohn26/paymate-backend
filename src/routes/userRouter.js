<<<<<<< Updated upstream
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
=======
// router.js
import { Router } from 'express';
import UserController from '../controller/userController.js';

const UserRouter = Router();

UserRouter.post("/create", UserController.registerUser);
UserRouter.post("/login", UserController.userLogin);
UserRouter.delete("/delete/:id", UserController.deleteUser);
UserRouter.get("/", UserController.getAllUsers);
UserRouter.patch("/verify/:phone", UserController.verifyOTP);
UserRouter.patch("/resend/:phone", UserController.resendOTP);

export default UserRouter;
>>>>>>> Stashed changes
