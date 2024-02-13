import express from'express';
import UserAccountController from '../controller/account.controller';
import AuthVerifyMiddleWare from '../middlewares/auth.verify.middleware'
const accountSettingRouter = express.Router();

accountSettingRouter.get("/userInfo",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.getUserProfileInfo);
accountSettingRouter.post("/userInfo",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.createUserAccountInfo);
accountSettingRouter.post("/wallet",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.addPaymentMethod);
accountSettingRouter.get("/wallet",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.getPaymentMethods);



export default accountSettingRouter;
