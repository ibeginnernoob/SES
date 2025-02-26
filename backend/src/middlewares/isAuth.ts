import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string;
    }
}

export interface ExtendedReq extends Request {
    userId: string;
}

const isAuth = async (req: ExtendedReq, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['Authorization']) {
            throw new Error('Invalid token!');
        }
        const token = req.headers['Authorization'] as string;

        const { userId } = <jwt.UserIDJwtPayload>(
            jwt.verify(token, process.env.JWT_SECRET!)
        );

        req.userId = userId;

        next();
    } catch (e) {
        console.log(e);
        res.json({
            msg: 'User not authenticated!',
        });
    }
};

export default isAuth;
