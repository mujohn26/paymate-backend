import express from'express';
import TransactionController from '../controller/transaction.controller';
import AuthVerifyMiddleWare from '../middlewares/auth.verify.middleware'
const transactionRouter = express.Router();

transactionRouter.post("/",AuthVerifyMiddleWare.isTokenAndUserVerified, TransactionController.createTransaction);
transactionRouter.get("/user",AuthVerifyMiddleWare.isTokenAndUserVerified, TransactionController.getTransactionsByUserId);
// transactionRouter.post("/wallet",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.addPaymentMethod);
// transactionRouter.get("/wallet",AuthVerifyMiddleWare.isTokenAndUserVerified, UserAccountController.getPaymentMethods);



export default transactionRouter;
