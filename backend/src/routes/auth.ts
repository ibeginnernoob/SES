import { Router, Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

import User from '../models/user'

const router=Router()

router.post('/signup',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const email=req.body.email
        const password=req.body.password
        const confirmPassword=req.body.confirmPassword

        const user=await User.findOne({
            email:email
        })

        if(user){
            throw new Error('User with email already exists!')
        } else if(confirmPassword!==password){
            throw new Error('Password and confirm password fields do not match!')
        }

        const createUser=new User({
            email:email,
            password:password
        })
        const DBRes=await createUser.save()

        const token=jwt.sign({
            userId:DBRes._id
        },process.env.JWT_SECRET!,{
            expiresIn:'15d'
        })

        res.json({
            msg:'User creation successful!',
            token:token
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

router.post('/signin',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const email=req.body.email
        const password=req.body.password

        const user=await User.findOne({
            email:email
        })

        if(!user){
            throw new Error('User with email does not exist!')
        }

        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET!,{
            expiresIn:'15d'
        })

        res.json({
            msg:'User signin successful!',
            token:token
        })
    } catch(e){
        console.log(e)
        res.json({
            msg:'Something went wrong!'
        })
    }
})

export default router