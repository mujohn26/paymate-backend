import express from 'express';
const router = express.Router();
import userRoutes from './userRouter';
import accountSettingRouter from './accountSetting.routes'
import transactionRouter from './transaction.routes';
import walletRouter from './wallet.routes'

router.use('/user', userRoutes);
router.use('/account', accountSettingRouter);
router.use('/transaction', transactionRouter)
router.use('/wallet', walletRouter)



export default router;