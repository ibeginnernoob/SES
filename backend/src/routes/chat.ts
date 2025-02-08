import { Router, Request, Response, NextFunction } from "express";
import Chat from "../models/chat";

const router=Router()

router.get('/chats',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.userId

        const chats=await Chat.find({
            owner:userId
        },'_id, title')

        res.status(200).json({
            chats:chats
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

router.get('/chat/:id',async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const userId=req.userId
        const chatId=req.params.id

        const chat=await Chat.find({
            owner:userId,
            _id:chatId
        }).populate('responses prompts')

        res.status(200).json({
            chat:chat
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg:'Something went wrong!'
        })
    }
})

export default router