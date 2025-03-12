import { Router, Request, Response, NextFunction } from 'express';

import User from '../models/user';

const router = Router();

router.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const userFireBaseId = req.body.fireBaseId;

            const createUser = new User({
                email: email,
                password: password,
                userFireBaseId: userFireBaseId,
                chat_ids: [],
            });
            await createUser.save();

            res.status(201).json({
                msg: 'User creation successful!',
                status: 201,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: 'Something went wrong!',
            });
        }
    }
);

export default router;
