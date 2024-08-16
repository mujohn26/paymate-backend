import express from'express';
import WalletController from '../controller/wallet.controller';
import AuthVerifyMiddleWare from '../middlewares/auth.verify.middleware'

const walletRouter = express.Router();

walletRouter.post("/topup",AuthVerifyMiddleWare.isTokenAndUserVerified, WalletController.topUpToWallet);


export default walletRouter;
