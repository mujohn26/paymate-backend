import express from 'express';
const router = express.Router();
import userRoutes from './userRouter';

router.use('/user', userRoutes);


export default router;