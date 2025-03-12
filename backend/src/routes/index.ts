import { Router } from 'express';

import authRouter from './auth';
import chatRouter from './chat';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', chatRouter);

export default router;
